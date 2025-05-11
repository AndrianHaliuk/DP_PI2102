import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) throw new Error('STRIPE_SECRET_KEY not set');

    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-04-30.basil',
    });
  }

  async createDonationIntent(
    amount: number,
    userId: number,
    campaignId: number,
    isAnonymous = false,
    currency = 'uah',   
  ) {
    if (amount <= 0) throw new BadRequestException('Amount must be positive');

    const donation = await this.prisma.donation.create({
      data: { amount, userId, campaignId, isAnonymous },
    });

    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: { userId, provider: 'Stripe', isDefault: true },
    });
    if (!bankAccount)
      throw new BadRequestException('No default Stripe account');

    const transaction = await this.prisma.transaction.create({
      data: {
        donationId: donation.id,
        bankAccountId: bankAccount.id,
        providerTxId: 'pending',
        status: 'pending',
        amount,
      },
    });

    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        donationId: donation.id.toString(),
        transactionId: transaction.id.toString(),
      },
    });

    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: { providerTxId: intent.id },
    });

    return { clientSecret: intent.client_secret };
  }
}
