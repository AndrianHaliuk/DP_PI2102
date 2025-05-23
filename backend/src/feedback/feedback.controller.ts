import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private prisma: PrismaService) {}

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
        message: body.message,
      },
    });
  }
}
