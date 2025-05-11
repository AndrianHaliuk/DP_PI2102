import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { DonationsService } from '../donations/donations.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserProfileController],
  providers: [UserProfileService, DonationsService],
  exports: [UserProfileService],
  
})
export class UserProfileModule {}