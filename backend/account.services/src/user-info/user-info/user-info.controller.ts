import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { GetUserDto } from 'src/user-info/dto/get-user.dto';
import { AddShippingAddressDto } from '../dto/add-shipping-address.dto';
import { UpdateShippingAddressDto } from '../dto/update-shipping-address.dto';
import { DeleteShippingAddressDto } from '../dto/delete-shipping-address.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private UserInfoService: UserInfoService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.UserInfoService.getUserData(id);
  }

  @Put('update/:id')
  updateUser(@Param('id') id: string, @Body() userData: GetUserDto) {
    return this.UserInfoService.updateUserData(id, userData);
  }
  @Post('add-address/:userId')
  addShippingAddress(
    @Param('userId') userId: string,
    @Body() addressDto: AddShippingAddressDto,
  ) {
    return this.UserInfoService.addShippingAddress(userId, addressDto);
  }

  @Put('update-address/:userId')
  updateShippingAddress(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateShippingAddressDto,
  ) {
    return this.UserInfoService.updateShippingAddress(userId, updateDto);
  }

  @Delete('delete-address/:userId')
  deleteShippingAddress(
    @Param('userId') userId: string,
    @Body() deleteDto: DeleteShippingAddressDto,
  ) {
    return this.UserInfoService.deleteShippingAddress(userId, deleteDto._id);
  }

  @Get('addresses/:userId')
  getShippingAddresses(@Param('userId') userId: string) {
    return this.UserInfoService.getShippingAddresses(userId);
  }
}
