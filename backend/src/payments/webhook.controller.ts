import {
  Controller,
  Post,
  Req,
  Res,
  Headers,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { DonationsService } from '../donations/donations.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('webhook')
export class WebhookController {
  private stripe: Stripe;
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private config: ConfigService,
    private donationsService: DonationsService,
    private prisma: PrismaService,  // додаємо PrismaService, щоб зробити запит до bankAccount
  ) {
    const key = this.config.get<string>('STRIPE_SECRET_KEY');
    this.stripe = new Stripe(key!, { apiVersion: '2025-04-30.basil' });
  }

  @Post()
  async handleStripeEvent(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret!,
      );
    } catch (err) {
      this.logger.error('Webhook signature verification failed', err);
      throw new BadRequestException('Invalid signature');
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const md = intent.metadata;

      const campaignId = parseInt(md.campaignId || '0', 10);
      const userId = parseInt(md.userId || '0', 10);
      const isAnonymous = md.isAnonymous === 'true';
      const amount = intent.amount_received / 100;

      if (!campaignId || (!userId && !isAnonymous)) {
        this.logger.warn('Missing required metadata in PaymentIntent');
        return res.status(400).send('Missing metadata');
      }

      try {
        // Знайти дефолтний Stripe bankAccount
        const bankAccount = await this.prisma.bankAccount.findFirst({
          where: {
            userId,
            provider: 'Stripe',
            isDefault: true,
          },
        });

        if (!bankAccount) {
          this.logger.warn(`No default Stripe bank account found for user ${userId}`);
          return res.status(400).send('No default Stripe bank account found');
        }

        const bankAccountId = bankAccount.id;

        // Знайти або створити донат
        let donation = await this.donationsService.findPendingDonation(userId, campaignId);

        if (!donation) {
          donation = await this.donationsService.donate(
            { campaignId, amount, isAnonymous },
            userId,
          );
          this.logger.log(`Created donation #${donation.id}`);
        } else {
          this.logger.log(`Found existing donation #${donation.id}`);
        }

        // Створити транзакцію
        await this.donationsService.createTransactionForDonation(donation.id, intent.id, bankAccountId, amount);

        // Підтвердити донат і оновити кампанію
        await this.donationsService.confirmDonation(donation.id, intent.id);

        this.logger.log(`Donation #${donation.id} confirmed for PaymentIntent ${intent.id}`);
      } catch (error) {
        this.logger.error('Error processing donation webhook', error);
        return res.status(500).send('Internal Server Error');
      }
    }

    return res.status(200).send('OK');
  }
}
