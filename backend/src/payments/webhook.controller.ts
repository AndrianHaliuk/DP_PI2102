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

@Controller('webhook')
export class WebhookController {
  private stripe: Stripe;
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private config: ConfigService,
    private donationsService: DonationsService,
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
      this.logger.error('Webhook signature failed', err);
      throw new BadRequestException('Invalid signature');
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const md = intent.metadata;
      const campaignId  = parseInt(md.campaignId  || '0', 10);
      const userId      = parseInt(md.userId      || '0', 10);
      const isAnonymous = md.isAnonymous === 'true';
      const amount      = intent.amount_received / 100;

      if (!campaignId || !userId) {
        this.logger.warn('Missing metadata on intent');
        return res.status(400).send('Missing metadata');
      }

      // 1) створюємо Donation
      const donation = await this.donationsService.donate(
        { campaignId, amount, isAnonymous },
        userId,
      );

      // 2) підтверджуємо та оновлюємо кампанію
      await this.donationsService.confirmDonation(donation.id, intent.id);

      this.logger.log(`Donation ${donation.id} created & confirmed`);
    }

    return res.status(200).send('OK');
  }
}