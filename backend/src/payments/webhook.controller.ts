import {
  Controller,
  Post,
  Headers,
  Req,
  Res,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { DonationsService } from '../donations/donations.service';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);
  private readonly stripe: Stripe;

  constructor(
    private readonly config: ConfigService,
    private readonly donationsService: DonationsService,
  ) {
    const secretKey = this.config.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) throw new Error('STRIPE_SECRET_KEY not set');
    this.stripe = new Stripe(secretKey, { apiVersion: '2025-04-30.basil' });
  }

  @Post()
  async handleStripeEvent(
    @Req() req: Request,
    @Res() res: Response,
    @Headers('stripe-signature') sig: string,
  ) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET not set');

    const rawBody = req.body as Buffer;

    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      this.logger.log(`Verified event: ${event.type}`);
    } catch (err) {
      this.logger.error('Webhook signature verification failed', err as any);
      throw new BadRequestException(`Webhook Error: ${(err as Error).message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent;
      this.logger.log(`PaymentIntent succeeded: ${intent.id}`);

      const donationId = parseInt(intent.metadata?.donationId || '0', 10);
      if (!donationId) return res.status(400).send('Missing donationId');

      try {
        await this.donationsService.confirmDonation(donationId, intent.id);
        this.logger.log(`Donation ${donationId} confirmed`);
      } catch (error) {
        this.logger.error('Error confirming donation', error as any);
        return res.status(500).send('Internal Server Error');
      }
    }

    return res.status(200).send('Received');
  }
}
