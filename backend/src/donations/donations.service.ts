import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async donate(dto: CreateDonationDto, userId?: number) {
    const campaign = await this.prisma.campaign.findUnique({ where: { id: dto.campaignId } });
    if (!campaign) throw new NotFoundException('Campaign not found');

    const donation = await this.prisma.donation.create({
      data: {
        amount: dto.amount,
        campaignId: dto.campaignId,
        userId: dto.isAnonymous ? null : userId,
        isAnonymous: dto.isAnonymous ?? false,
      },
    });

    return donation;
  }

  async confirmDonation(donationId: number, stripeTxId: string): Promise<void> {
  const donation = await this.prisma.donation.findUnique({
    where: { id: donationId },
    include: { campaign: true },
  });

  if (!donation) throw new NotFoundException('Donation not found');
  if (!donation.campaign) throw new NotFoundException('Campaign not found');

  await this.prisma.transaction.updateMany({
    where: { providerTxId: stripeTxId },
    data: { status: 'succeeded' },
  });

  const newCurrentAmount = donation.campaign.currentAmount + donation.amount;
  const isClosed = newCurrentAmount >= donation.campaign.goalAmount;

  await this.prisma.campaign.update({
    where: { id: donation.campaignId },
    data: {
      currentAmount: newCurrentAmount,
      isClosed,
    },
  });

  await this.prisma.donation.update({
    where: { id: donation.id },
    data: {
      status: 'confirmed',
    },
  });
}

  async findAllByUser(userId: number) {
    return this.prisma.donation.findMany({
      where: {
        userId,
        transaction: { status: 'succeeded' },
      },
      include: {
        campaign: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTotalDonatedByUser(userId: number): Promise<number> {
    const result = await this.prisma.donation.aggregate({
      where: {
        userId,
        transaction: { status: 'succeeded' },
      },
      _sum: { amount: true },
    });
    return result._sum.amount ?? 0;
  }


  async findPendingDonation(userId: number, campaignId: number) {
    return this.prisma.donation.findFirst({
      where: {
        userId,
        campaignId,
        status: 'pending',
      },
    });
  }

  async createTransactionForDonation(
    donationId: number,
    stripeTxId: string,
    bankAccountId: number,
    amount: number,
  ) {
    return this.prisma.transaction.create({
      data: {
        donationId,
        providerTxId: stripeTxId,
        bankAccountId,
        status: 'pending',
        amount,
      },
    });
  }
}
