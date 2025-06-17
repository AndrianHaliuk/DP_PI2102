import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletter: NewsletterService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.NO_CONTENT)
  async subscribe(@Body('email') email: string): Promise<void> {
    if (!email || !email.includes('@')) {
      throw new Error('Невалідний email');
    }
    await this.newsletter.subscribe(email);
  }
}