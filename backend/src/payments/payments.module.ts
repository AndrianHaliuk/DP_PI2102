import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsController } from './payments.controller';
import { WebhookController } from './webhook.controller';
import { StripeModule } from '../stripe/stripe.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DonationsModule } from '../donations/donations.module'; 

@Module({
  imports: [ConfigModule, StripeModule, PrismaModule, DonationsModule], 
  controllers: [PaymentsController, WebhookController],
})
export class PaymentsModule {}
