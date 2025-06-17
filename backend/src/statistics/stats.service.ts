import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatistics() {
    const donationsCount = await this.prisma.donation.count({
      where: { status: 'confirmed', isDeleted: false },
    });

    const completedCollections = await this.prisma.campaign.count({
      where: { isClosed: true, isDeleted: false },
    });

    return {
      donationsCount,
      completedCollections,
    };
  }
}