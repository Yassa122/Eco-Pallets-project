import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices/decorators';
import { GetUserId } from 'src/identity/decorators/get-user-id.decorator';
import { JwtAuthGuard } from 'src/identity/strategies/jwt-auth.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private proileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @MessagePattern('updateUser')
  async updateUser(command) {
    console.log('Updating user: ', command.user);
    return this.proileService.updateUserProfile(command.userId, command.data);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@GetUserId() userId: string) {
    return this.proileService.getUserProfileInfo(userId);
  }
}
