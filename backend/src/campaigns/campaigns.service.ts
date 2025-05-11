import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.campaign.findMany({ orderBy: { priority: 'desc' } });
  }

  async findOne(id: number) {
    const campaign = await this.prisma.campaign.findUnique({ where: { id } });
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
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
      },
    });
  }

  async update(id: number, dto: CreateCampaignDto) {
    await this.findOne(id);
    return this.prisma.campaign.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.campaign.delete({ where: { id } });
  }
}