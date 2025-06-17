import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { NewsletterService } from '../newsletter/newsletter.service';
import { EmailService } from '../newsletter/email.service';

@Injectable()
export class CampaignsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly newsletterService: NewsletterService,
    private readonly emailService: EmailService,
  ) {}

  async findAll(options?: { excludeDeleted?: boolean }) {
    const where = options?.excludeDeleted ? { isDeleted: false } : {};
    const campaigns = await this.prisma.campaign.findMany({
      where,
      orderBy: { priority: 'asc' },
      include: {
        donations: {
          where: { isAnonymous: false },
          orderBy: { amount: 'desc' },
          take: 3,
          include: { user: { select: { name: true } } },
        },
      },
    });

    return campaigns.map(c => ({
      ...c,
      isClosed: c.currentAmount >= c.goalAmount,
      topDonors: c.donations.map(d => ({
        name: d.user?.name ?? 'Анонім',
        amount: d.amount,
      })),
    }));
  }

  async findOne(id: number, options?: { excludeDeleted?: boolean }) {
    const where = options?.excludeDeleted ? { id, isDeleted: false } : { id };
    const campaign = await this.prisma.campaign.findUnique({
      where,
      include: {
        donations: {
          where: { isAnonymous: false },
          orderBy: { amount: 'desc' },
          take: 3,
          include: { user: { select: { name: true } } },
        },
      },
    });
    if (!campaign) throw new NotFoundException('Campaign not found');
    return {
      ...campaign,
      isClosed: campaign.currentAmount >= campaign.goalAmount,
      topDonors: campaign.donations.map(d => ({
        name: d.user?.name ?? 'Анонім',
        amount: d.amount,
      })),
    };
  }

  async create(dto: CreateCampaignDto, userId: number) {
    const campaign = await this.prisma.campaign.create({
      data: {
        title: dto.title,
        description: dto.description,
        imageUrl: dto.imageUrl,
        goalAmount: Number(dto.goalAmount),
        priority: Number(dto.priority),
        createdById: userId,
        isDeleted: false,
      },
    });

    if (campaign.priority === 1) {
      const emails = await this.newsletterService.getAllEmails();
      if (emails.length) {
        await this.emailService.sendUrgentCampaignNotification(
          emails,
          campaign.title,
          campaign.id,
        );
      }
    }

    return campaign;
  }

  async update(id: number, dto: CreateCampaignDto) {
    const existing = await this.findOne(id, { excludeDeleted: true });
    const wasUrgent = existing.priority === 1;

    const campaign = await this.prisma.campaign.update({
      where: { id },
      data: dto,
    });

    if (campaign.priority === 1 && !wasUrgent) {
      const emails = await this.newsletterService.getAllEmails();
      if (emails.length) {
        await this.emailService.sendUrgentCampaignNotification(
          emails,
          campaign.title,
          campaign.id,
        );
      }
    }

    return campaign;
  }

  async remove(id: number) {
    await this.findOne(id, { excludeDeleted: true });
    return this.prisma.campaign.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
