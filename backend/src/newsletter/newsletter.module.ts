import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { EmailService } from './email.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService, EmailService, PrismaService],
  exports: [NewsletterService, EmailService],
})
export class NewsletterModule {}
