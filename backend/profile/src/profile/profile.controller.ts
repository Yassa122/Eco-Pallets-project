import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('users')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get(':id')
  async getProfileInfo(@Param('id') id: string) {
    return this.profileService.getProfileInfo(id);
  }
}
