import { Controller, Get, Post, Delete, Patch, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { MessagePattern } from '@nestjs/microservices';
// import { ShippingAddressDto } from 'src/dto/shipping-address.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Get(':id')
  async getProfileInfo(@Param('id') id: string) {
    return this.userInfoService.getProfileInfo(id);
  }

//   @Post(':userId/addresses')
//   async addAddress(@Param('userId') userId: string, @Body() addressDto: ShippingAddressDto): Promise<User> {
//     try {
//       return await this.userInfoService.addShippingAddress(userId, addressDto);
//     } catch (error) {
//       throw new HttpException('Failed to add address', HttpStatus.BAD_REQUEST);
//     }
//   }

//   @Delete(':userId/addresses')
//   async removeAddress(@Param('userId') userId: string, @Body('label') addressLabel: string): Promise<User> {
//     try {
//       return await this.userInfoService.removeShippingAddress(userId, addressLabel);
//     } catch (error) {
//       throw new HttpException('Failed to remove address', HttpStatus.NOT_FOUND);
//     }
//   }

// @Patch(':userId/addresses/:index')
// async updateAddress(
//   @Param('userId') userId: string,
//   @Param('index') index: string, // Keep it as string here
//   @Body() addressDto: ShippingAddressDto
// ): Promise<User> {
//   const parsedIndex = parseInt(index, 10); // Ensure parsing is base 10

//   if (isNaN(parsedIndex)) { // Check if the parsing result is Not-a-Number
//     throw new HttpException('Invalid index', HttpStatus.BAD_REQUEST);
//   }

//   try {
//     return await this.userInfoService.updateShippingAddress(userId, parsedIndex, addressDto);
//   } catch (error) {
//     throw new HttpException('Failed to update address', HttpStatus.BAD_REQUEST);
//   }
// }
@MessagePattern('get_user')
  getUser(data:any){
    return this.userInfoService.getProfileInfo(data.value);
  }

}
