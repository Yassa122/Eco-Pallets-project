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
  Delete,
} from '@nestjs/common';

import { Response } from 'express'; // Import Response from express for handling HTTP responses
import { AppService } from './app.service';
import { JwtAuthGuard } from './identity/strategies/jwt-auth.guard';
import { CurrentUser } from './decorators/get-user-id.decorator';
import { UpdateUserProfileDto } from './identity/dto/updateUserProfile.dto';
import { AddShippingAddressDto } from './user-info/dto/add-shipping-address.dto';
import { DeleteShippingAddressDto } from './user-info/dto/delete-shipping-address.dto';
import { UpdateShippingAddressDto } from './user-info/dto/update-shipping-address.dto';
import { UserInfoService } from './user-info/user-info/user-info.service';

@Controller('account')
export class AppController {
  constructor(
    private accountServices: AppService,
    private userInfoService: UserInfoService,
  ) {}

  @Get('hello')
  getHello(): any {
    return this.accountServices.hello();
  }
  //working
  @Post('sign-up')
  async register(@Body() reqBody: any) {
    return this.accountServices.register(reqBody);
  }
  //working
  
  @UseGuards(JwtAuthGuard)
  @Post('sign-in')
  async login(@Body() reqBody: any, @Res() res: Response) {
    const result = await this.accountServices.login(reqBody);
    if (result.success) {
      res.cookie('accessToken', result.accessToken, {
        httpOnly: false, // Should be true to prevent client-side JS from accessing the cookie
        secure: false, // Should be true in production to send the cookie only over HTTPS
        sameSite: 'none', // Typically 'lax' is sufficient for most use cases and improves CSRF protection
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

  //working
  @Post('user-info/add-address')
  addShippingAddress(
    @CurrentUser('userId') userId: string,
    @Body() addressDto: AddShippingAddressDto,
  ) {
    return this.userInfoService.addShippingAddress(userId, addressDto);
  }
  //working (when testingg in postman, use the _id of the address you want to update as the id in the body)
  @Put('user-info/update-address')
  updateShippingAddress(
    @CurrentUser('userId') userId: string,
    @Body() updateDto: UpdateShippingAddressDto,
  ) {
    return this.userInfoService.updateShippingAddress(userId, updateDto);
  }
  //working
  @Delete('user-info/delete-address')
  deleteShippingAddress(
    @CurrentUser('userId') userId: string,
    @Body() deleteDto: DeleteShippingAddressDto,
  ) {
    return this.userInfoService.deleteShippingAddress(userId, deleteDto._id);
  }
}
