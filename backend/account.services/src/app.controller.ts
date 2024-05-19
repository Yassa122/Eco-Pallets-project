import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Res,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';

import { Response } from 'express'; // Import Response from express for handling HTTP responses
import { AppService } from './app.service';
import { JwtAuthGuard } from './identity/strategies/jwt-auth.guard';
import { GetUserId } from './identity/decorators/get-user-id.decorator';
import { UpdateUserProfileDto } from './identity/dto/updateUserProfile.dto';

@Controller('account')
export class AppController {
  constructor(private accountServices: AppService) {}

  @Get('hello')
  getHello(): any {
    return this.accountServices.hello();
  }

  @Post('sign-up')
  async register(@Body() reqBody: any) {
    return this.accountServices.register(reqBody);
  }


  @Post('sign-in')
  async login(@Body() reqBody: any, @Res() res: Response) {
    const result = await this.accountServices.login(reqBody);
    if (result.success) {
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Set to true in production
        sameSite: 'strict', // Adjust according to your cross-site request needs
        expires: new Date(Date.now() + 3600000), // Set cookie to expire in 1 hour
      });
      return res.status(200).json(result);
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // async getUser(@GetUserId() userId: string) {
  //   // Using the custom decorator to extract the userId
  //   return this.accountServices.getUser(userId);
  // }
  // @Get(':id/send-info')
  // async handleSendUserInfo(@Param('id') id: string) {
  //   await this.accountServices.sendUserInfo(id);
  //   return { message: 'User info sent to Kafka' };
  // }
  // @UseGuards(JwtAuthGuard)
  // @Put('profile/update')
  // async updateUser(@GetUserId() userId: string, @Body() updateUserDto: UpdateUserProfileDto) {
  //   return this.accountServices.updateUser(userId, updateUserDto);
  // }

  // @Get(':id')
  // getUser(@Param('id') id: string) {
  //   return this.accountServices.getUserData(id);
  // }

  // @Put('update/:id')
  // updateUser(@Param('id') id: string, @Body() userData: GetUserDto) {
  //   return this.accountServices.updateUserData(id, userData);
  // }
  // @EventPattern('user_fetched')
  // handleOrderCreated(data:any){
  // this.accountServices.handleUserInfo(data.value)}

  // onModuleInit() {
  //   this.client.subscribeToResponseOf('get_user_info');
  // }
}
