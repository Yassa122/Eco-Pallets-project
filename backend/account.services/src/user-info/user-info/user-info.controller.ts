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
<<<<<<< HEAD
  constructor(private userInfoService: UserInfoService) {}
=======
  constructor(private UserInfoService: UserInfoService) {}
>>>>>>> e77d17d9dcf178cad4213d23c10cc322e58c1aba

  @Get('profile')
  getUser(@CurrentUser() userId: string) {
    return this.userInfoService.getUserData(userId);
  }

<<<<<<< HEAD
  @Put('update')
  updateUser(@CurrentUser() userId: string, @Body() userData: GetUserDto) {
    return this.userInfoService.updateUserData(userId, userData);
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
=======
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
>>>>>>> e77d17d9dcf178cad4213d23c10cc322e58c1aba
  }
}
