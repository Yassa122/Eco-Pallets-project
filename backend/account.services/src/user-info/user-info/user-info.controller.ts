import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserInfoService } from './user-info.service';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { AddShippingAddressDto } from '../dto/add-shipping-address.dto';
import { UpdateShippingAddressDto } from '../dto/update-shipping-address.dto';
import { DeleteShippingAddressDto } from '../dto/delete-shipping-address.dto';

@Controller('user-info')
@UseGuards(AuthGuard('jwt')) // Apply JWT Auth Guard to all routes in the controller
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @Get('addresses')
  getShippingAddresses(@GetUserId('userId') userId: string) {
    return this.userInfoService.getShippingAddresses(userId);
  }

  @Post('add-address')
  addShippingAddress(
    @GetUserId('userId') userId: string,
    @Body() addressDto: AddShippingAddressDto,
  ) {
    return this.userInfoService.addShippingAddress(userId, addressDto);
  }

  @Put('update-address')
  updateShippingAddress(
    @GetUserId('userId') userId: string,
    @Body() updateDto: UpdateShippingAddressDto,
  ) {
    return this.userInfoService.updateShippingAddress(userId, updateDto);
  }

  @Delete('delete-address')
  deleteShippingAddress(
    @GetUserId('userId') userId: string,
    @Body() deleteDto: DeleteShippingAddressDto,
  ) {
    return this.userInfoService.deleteShippingAddress(userId, deleteDto._id);
  }
}
