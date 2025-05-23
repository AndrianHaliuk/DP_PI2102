import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StorageClient } from '@supabase/storage-js';
import { Express } from 'express';
import * as fs from 'fs';

@Injectable()
export class SupabaseStorageService {
  private storage: StorageClient;
  private bucket: string;

  constructor() {
    const url = `${process.env.SUPABASE_URL}/storage/v1`;
    const token = process.env.SUPABASE_SERVICE_ROLE;

    if (!url || !token) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE');
    }

    this.bucket = process.env.SUPABASE_BUCKET!;
   this.storage = new StorageClient(url, {
        apikey: token,
        Authorization: `Bearer ${token}`,
    });
  }

  async uploadAvatar(file: Express.Multer.File, userId: string): Promise<string> {
    if (!file.mimetype.startsWith('image/')) {
      throw new InternalServerErrorException('Invalid file type');
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const path = `user-${userId}/${filename}`;
    const buffer = file.buffer || fs.readFileSync(file.path);

    const { error } = await this.storage.from(this.bucket).upload(path, buffer, {
      contentType: file.mimetype,
      upsert: true,
    });

    if (file.path) {
      fs.unlink(file.path, () => {});
    }

    if (error) throw new InternalServerErrorException('Upload failed: ' + error.message);

    const { publicUrl } = this.storage.from(this.bucket).getPublicUrl(path).data;
    return publicUrl;
  }
  async uploadCampaignImage(file: Express.Multer.File, campaignId: string): Promise<string> {
  if (!file.mimetype.startsWith('image/')) {
    throw new InternalServerErrorException('Invalid file type');
  }

  const filename = `${Date.now()}-${file.originalname}`;
  const path = `campaign-${campaignId}/${filename}`;
  const buffer = file.buffer || fs.readFileSync(file.path);

  const { error } = await this.storage.from(this.bucket).upload(path, buffer, {
    contentType: file.mimetype,
    upsert: true,
  });

  if (file.path) {
    fs.unlink(file.path, () => {});
  }

  if (error) throw new InternalServerErrorException('Upload failed: ' + error.message);

  const { publicUrl } = this.storage.from(this.bucket).getPublicUrl(path).data;
  return publicUrl;
}
}
