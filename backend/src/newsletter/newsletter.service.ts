import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}


  async subscribe(email: string): Promise<void> {
    const exists = await this.prisma.subscriber.findUnique({ where: { email } });
    if (exists) throw new ConflictException('Цей email уже підписаний');
    await this.prisma.subscriber.create({ data: { email } });
  }

  async getAllEmails(): Promise<string[]> {
    const subs = await this.prisma.subscriber.findMany();
    return subs.map(s => s.email);
  }
}
