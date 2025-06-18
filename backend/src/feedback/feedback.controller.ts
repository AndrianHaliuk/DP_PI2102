import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Public } from '../auth/public.decorator';

@Controller('feedback')
export class FeedbackController {
  constructor(private prisma: PrismaService) {}

  @Public()
  @Post()
  async createFeedback(
    @Req() req: Request,
    @Body() body: CreateFeedbackDto,
  ) {
    const user = req.user as { id: number } | undefined;

    if (!user?.id) {
      throw new UnauthorizedException('Тільки для авторизованих користувачів');
    }

    return this.prisma.feedback.create({
      data: {
        userId: user.id,
        subject: body.subject,
        message: body.message,
      },
    });
  }

@Get()
async getAllFeedback() {
  return this.prisma.feedback.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          name: true,
          profile: { select: { avatarUrl: true } },
        },
      },
    },
  });
}
}
