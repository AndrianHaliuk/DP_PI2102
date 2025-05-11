import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private prisma: PrismaService) {}

  async getByUserId(userId: number) {
    const profile = await this.prisma.userProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async create(userId: number, dto: CreateUserProfileDto) {
    return this.prisma.userProfile.create({
      data: { userId, ...dto },
    });
  }

  async update(userId: number, dto: UpdateUserProfileDto) {
    await this.getByUserId(userId);
    return this.prisma.userProfile.update({
      where: { userId },
      data: dto,
    });
  }
  async findByUserId(userId: number) {
    return this.prisma.userProfile.findUnique({
      where: { userId },
      include: {
        user: true, 
      },
    });
  }
  
  async updateByUserId(userId: number, dto: UpdateUserProfileDto) {
    return this.prisma.userProfile.update({
      where: { userId },
      data: dto,
    });
  }

}