import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../newsletter/email.service';
import { NewsletterModule } from '../newsletter/newsletter.module';

@Module({
  controllers: [CampaignsController],
  providers: [CampaignsService, PrismaService, EmailService],
  imports: [NewsletterModule], 
})
export class CampaignsModule {}