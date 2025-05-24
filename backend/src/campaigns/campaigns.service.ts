import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

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
          include: {
            user: {
              select: { name: true }
            }
          }
        }
      }
    });

    return campaigns.map(c => ({
      ...c,
      isClosed: c.currentAmount >= c.goalAmount,
      topDonors: c.donations.map(d => ({
        name: d.user?.name ?? 'Анонім',
        amount: d.amount
      }))
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
          include: {
            user: {
              select: { name: true }
            }
          }
        }
      }
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return {
      ...campaign,
      isClosed: campaign.currentAmount >= campaign.goalAmount,
      topDonors: campaign.donations.map(d => ({
        name: d.user?.name ?? 'Анонім',
        amount: d.amount
      }))
    };
  }

  async create(dto: CreateCampaignDto, userId: number) {
    return this.prisma.campaign.create({
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
  }

  async update(id: number, dto: CreateCampaignDto) {
    await this.findOne(id, { excludeDeleted: true });
    return this.prisma.campaign.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id, { excludeDeleted: true });

    // Soft delete — позначаємо як видалену
    return this.prisma.campaign.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
