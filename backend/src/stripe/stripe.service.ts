// src/stripe/stripe.service.ts
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
  ): Promise<{ clientSecret: string }> {
    if (amount <= 0) {
      throw new BadRequestException('Amount must be positive');
    }

    // Переконаємося, що користувач дійсно має акаунт у Stripe
    const bankAccount = await this.prisma.bankAccount.findFirst({
      where: { userId, provider: 'Stripe', isDefault: true },
    });
    if (!bankAccount) {
      throw new BadRequestException('No default Stripe account');
    }

    // Створюємо PaymentIntent із усім необхідним у metadata
    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // у копійках
      currency,
      metadata: {
        userId:       String(userId),
        campaignId:   String(campaignId),
        isAnonymous:  String(isAnonymous),
      },
    });

    return { clientSecret: intent.client_secret! };
  }
}
