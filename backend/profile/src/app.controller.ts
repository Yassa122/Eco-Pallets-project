import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

import { ShippingAddressDto } from 'src/dto/shipping-address.dto';
import { GetUserId } from './decorators/get-user-id.decorator';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('profile')
  async getUser(@GetUserId() userId: string) {
    // Using the custom decorator to extract the userId
    return this.appService.getUserInfo(userId);
  }

  @Post(':id/shipping-address')
  @HttpCode(HttpStatus.CREATED)
  async addUserShippingAddress(
    @Param('id') userId: string,
    @Body() addressDto: ShippingAddressDto,
  ) {
    try {
      await this.appService.addUserShippingAddress(userId, addressDto);
      return {
        status: 'success',
        message: 'Shipping address added successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to add shipping address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id/shipping-address')
  async removeUserShippingAddress(
    @Param('id') userId: string,
    @Body('label') addressLabel: string,
  ) {
    try {
      await this.appService.removeUserShippingAddress(userId, addressLabel);
      return {
        status: 'success',
        message: 'Shipping address removed successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to remove shipping address',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id/shipping-address/:index')
  async updateUserShippingAddress(
    @Param('id') userId: string,
    @Param('index') index: number,
    @Body() addressDto: ShippingAddressDto,
  ) {
    try {
      await this.appService.updateUserShippingAddress(
        userId,
        index,
        addressDto,
      );
      return {
        status: 'success',
        message: 'Shipping address updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update shipping address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
  // @MessagePattern('get_user')
  // getUser(data:any){
  //   return this.appService.getUser(data.value);
  // }
}
