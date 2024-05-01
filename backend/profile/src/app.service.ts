import { Injectable } from '@nestjs/common';
import { ProfileService } from './profile/profile.service';  // Import ProfileService

@Injectable()
export class AppService {
  constructor(private profileService: ProfileService) {}  // Inject ProfileService

  async getProfileInfo(userId: string): Promise<any> {
    // Use ProfileService to fetch profile info
    return this.profileService.getProfileInfo(userId);
  }
}
