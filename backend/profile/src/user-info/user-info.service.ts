import { Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { ShippingAddressDto } from 'src/dto/shipping-address.dto'; 
import { ClientKafka } from '@nestjs/microservices';
import { UpdateProfileDto } from 'src/dto/update-profile-info.dto';


@Injectable()
export class UserInfoService implements OnModuleInit {
  constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('getUserData');
    this.client.subscribeToResponseOf('updateUserData');
  }
    async getProfileInfo(userId: string): Promise<any> {
      const user = await this.client.send('getUserData', { userId }).toPromise();
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      return user;
    }
  
    async updateProfileInfo(userId: string, updateData: UpdateProfileDto): Promise<any> {
      const updatedUser = await this.client.send('updateUserData', { userId, ...updateData }).toPromise();
      return updatedUser;
    }

}


//   async addShippingAddress(userId: string, addressDto: ShippingAddressDto): Promise<User> {
//     const user = await this.userModel.findById(userId);
//     user.shippingAddresses.push(addressDto);
//     return user.save();
//   }

//   async removeShippingAddress(userId: string, addressLabel: string): Promise<User> {
//     const user = await this.userModel.findById(userId);
//     user.shippingAddresses = user.shippingAddresses.filter(address => address.label !== addressLabel);
//     return user.save();
//   }

//   async updateShippingAddress(userId: string, addressIndex: number, addressDto: ShippingAddressDto): Promise<User> {
//     const user = await this.userModel.findById(userId);
//     user.shippingAddresses[addressIndex] = addressDto;
//     return user.save();
//   }
 

