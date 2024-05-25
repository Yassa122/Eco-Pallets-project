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
import { GetUserDto } from '../dto/get-user.dto';
import { AddShippingAddressDto } from '../dto/add-shipping-address.dto';
import { UpdateShippingAddressDto } from '../dto/update-shipping-address.dto';
import { DeleteShippingAddressDto } from '../dto/delete-shipping-address.dto';
import { CurrentUser } from '../../decorators/current-user.decorator'; // Adjust the import based on your structure

@Controller('user-info')
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @Get('profile')
  getUser(@CurrentUser() userId: string) {
    return this.userInfoService.getUserData(userId);
  }


  @Put('update')
  updateUser(@CurrentUser() userId: string, @Body() userData: GetUserDto) {
    return this.userInfoService.updateUserData(userId, userData);
  }

  @Put('updateByMail')
  updateUserDataByEmail(@Body('email') email: string, @Body() userData: GetUserDto) {
    return this.userInfoService.updateUserDataByEmail(email, userData);
  }

  @Post('add-address')
  addShippingAddress(@CurrentUser() userId: string, @Body() addressDto: AddShippingAddressDto) {
    return this.userInfoService.addShippingAddress(userId, addressDto);
  }

  @Put('update-address')
  updateShippingAddress(@CurrentUser() userId: string, @Body() updateDto: UpdateShippingAddressDto) {
    return this.userInfoService.updateShippingAddress(userId, updateDto);
  }

  @Delete('delete-address')
  deleteShippingAddress(@CurrentUser() userId: string, @Body() deleteDto: DeleteShippingAddressDto) {
    return this.userInfoService.deleteShippingAddress(userId, deleteDto._id);
  }

  @Get('addresses')
  getShippingAddresses(@CurrentUser() userId: string) {
    return this.userInfoService.getShippingAddresses(userId);
  }
}
