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
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
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
  private readonly logger = new Logger(AppController.name);

  constructor(
    private accountServices: AppService,
    private userInfoService: UserInfoService,
  ) {}

  @Get('hello')
  getHello(): any {
    return this.accountServices.hello();
  }

  @Post('sign-up')
  async register(@Body() reqBody: any) {
    return this.accountServices.register(reqBody);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-in')
  async login(@Body() reqBody: any, @Res() res: Response) {
    const result = await this.accountServices.login(reqBody);
    if (result.success) {
      res.cookie('accessToken', result.accessToken, {
        httpOnly: false,
        secure: false,
        sameSite: 'none',
        expires: new Date(Date.now() + 3600000),
      });
      return res.status(200).json(result);
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUser(@CurrentUser() userId: string) {
    return this.accountServices.getUser(userId);
  }

  @Get(':id/send-info')
  async handleSendUserInfo(@Param('id') id: string) {
    await this.accountServices.sendUserInfo(id);
    return { message: 'User info sent to Kafka' };
  }

  @Put('profile/update')
  async updateUser(
    @CurrentUser() userId: string,
    @Body() updateUserDto: UpdateUserProfileDto,
  ) {
    return this.userInfoService.updateUserData(userId, updateUserDto);
  }

  @Get('user-info/addresses')
  getShippingAddresses(@CurrentUser('userId') userId: string) {
    return this.userInfoService.getShippingAddresses(userId);
  }

  @Post('user-info/add-address')
  addShippingAddress(
    @CurrentUser('userId') userId: string,
    @Body() addressDto: AddShippingAddressDto,
  ) {
    return this.userInfoService.addShippingAddress(userId, addressDto);
  }

  @Put('user-info/update-address')
  updateShippingAddress(
    @CurrentUser('userId') userId: string,
    @Body() updateDto: UpdateShippingAddressDto,
  ) {
    return this.userInfoService.updateShippingAddress(userId, updateDto);
  }

  @Delete('user-info/delete-address')
  deleteShippingAddress(
    @CurrentUser('userId') userId: string,
    @Body() deleteDto: DeleteShippingAddressDto,
  ) {
    return this.userInfoService.deleteShippingAddress(userId, deleteDto._id);
  }

  @Post('guest')
  @HttpCode(HttpStatus.OK)
  async createGuestUser(@Res() res: Response) {
    try {
      const result = await this.accountServices.createGuestUser();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      this.logger.error('Error in createGuestUser endpoint', error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Failed to create guest user',
      });
    }
  }
}
