// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { DonationsModule } from './donations/donations.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { StripeModule } from './stripe/stripe.module';
import { PaymentsModule } from './payments/payments.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './uploads/upload.controller';
import { UploadsModule } from './uploads/uploads.module';
import { FeedbackModule } from './feedback/feedback.module';
import { StatisticsModule } from './statistics/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UploadsModule,
    PrismaModule,
    AuthModule,
    FeedbackModule,
    CampaignsModule,
    DonationsModule,
    UserProfileModule,
    StripeModule,
    PaymentsModule,
    StatisticsModule,
  ],
  controllers: [
    AppController,
    UploadController,
  ],
  providers: [AppService],
})
export class AppModule {}
