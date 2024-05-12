import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { ShippingAddressDto } from 'src/dto/shipping-address.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}
  @Get(':id')
  async getProfileInfo(@Param('id') id: string) {
    try {
      const profileInfo = await this.userInfoService.getProfileInfo(id);
      return profileInfo;
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post(':userId/addresses')
  async addAddress(
    @Param('userId') userId: string,
    @Body() addressDto: ShippingAddressDto,
  ) {
    try {
      await this.userInfoService.addShippingAddress(userId, addressDto);
      return { status: 'success', message: 'Address added successfully.' };
    } catch (error) {
      throw new HttpException('Failed to add address', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':userId/addresses')
  async removeAddress(
    @Param('userId') userId: string,
    @Body('label') addressLabel: string,
  ) {
    try {
      await this.userInfoService.removeShippingAddress(userId, addressLabel);
      return { status: 'success', message: 'Address removed successfully.' };
    } catch (error) {
      throw new HttpException('Failed to remove address', HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':userId/addresses/:index')
  async updateAddress(
    @Param('userId') userId: string,
    @Param('index') index: string,
    @Body() addressDto: ShippingAddressDto,
  ) {
    const parsedIndex = parseInt(index, 10); // Ensure parsing is base 10
    if (isNaN(parsedIndex)) {
      // Check if the parsing result is Not-a-Number
      throw new HttpException('Invalid index', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.userInfoService.updateShippingAddress(
        userId,
        parsedIndex,
        addressDto,
      );
      return { status: 'success', message: 'Address updated successfully.' };
    } catch (error) {
      throw new HttpException(
        'Failed to update address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
