import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { StripeService } from '../stripe/stripe.service';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('intent')
  async createIntent(
    @GetUser('id') userId: number,
    @Body() body: {
      amount: number;
      campaignId: number;
      isAnonymous?: boolean;
      currency?: string;
    },
  ) {
    const { amount, campaignId, isAnonymous = false, currency = 'uah' } = body;
    const { clientSecret } = await this.stripeService.createDonationIntent(
      amount,
      userId,
      campaignId,
      isAnonymous,
      currency,
    );
    return { clientSecret };
  }
}