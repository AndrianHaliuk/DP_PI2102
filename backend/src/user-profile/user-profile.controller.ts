import { Controller, Get, Put, Body, NotFoundException } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { DonationsService } from '../donations/donations.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('user-profile')
// No @UseGuards here, CombinedAuthGuard працює глобально
export class UserProfileController {
  constructor(
    private profileService: UserProfileService,
    private donationsService: DonationsService,
  ) {}

  @Get('me') 
  async getMyProfile(@CurrentUser() user: { id: number }) {
    const profile = await this.profileService.findByUserId(user.id);
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  @Put('me')
  updateMyProfile(
    @CurrentUser() user: { id: number },
    @Body() dto: UpdateUserProfileDto,
  ) {
    return this.profileService.updateByUserId(user.id, dto);
  }

  @Get('me/donations')
  getMyDonations(@CurrentUser() user: { id: number }) {
    return this.donationsService.findAllByUser(user.id);
  }

  @Get('me/donations/summary')
  getDonationSummary(@CurrentUser() user: { id: number }) {
    return this.donationsService.getTotalDonatedByUser(user.id);
  }
}