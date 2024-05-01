// app.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')  // Define a base route for your API
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) {}

  @Get('profile/:userId')  // Route to get user profile
  getProfileInfo(@Param('userId') userId: string) {
    return this.appService.getProfileInfo(userId);
  }
}
