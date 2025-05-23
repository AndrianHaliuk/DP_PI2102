import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseStorageService } from './supabase-storage.service';
import { Request } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly supabaseStorageService: SupabaseStorageService) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = (req as any).user?.id || 'anonymous';
    const url = await this.supabaseStorageService.uploadAvatar(file, userId);
    return { url };
  }
  @Post('campaign-image/:campaignId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCampaignImage(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const campaignId = req.params.campaignId;
    if (!campaignId) {
      throw new BadRequestException('campaignId is required');
    }
    const url = await this.supabaseStorageService.uploadCampaignImage(file, campaignId);
    return { url };
  }
}
