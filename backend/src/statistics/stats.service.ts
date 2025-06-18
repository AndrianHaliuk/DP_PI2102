import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatistics() {
    const [donationsCount, completedCollections, totalAmountResult] = await Promise.all([
      this.prisma.donation.count({
        where: { status: 'confirmed', isDeleted: false },
      }),
      this.prisma.campaign.count({
        where: { isClosed: true, isDeleted: false },
      }),
      this.prisma.donation.aggregate({
        where: { status: 'confirmed', isDeleted: false },
        _sum: { amount: true },
      }),
    ]);

    const totalAmount = totalAmountResult._sum.amount || 0;

    return {
      donationsCount,
      completedCollections,
      totalAmount,
    };
  }
}
