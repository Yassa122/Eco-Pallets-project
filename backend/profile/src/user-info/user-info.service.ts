import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { ShippingAddressDto } from 'src/dto/shipping-address.dto'; 
import { ClientKafka } from '@nestjs/microservices';


@Injectable()
export class UserInfoService {
  constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientKafka) {}

  async getProfileInfo(userId: string): Promise<any> {
    // Sending a request to the other service to handle user information
    const response = this.client.emit('get_user_info', { userId }).toPromise();

    // Await response from the other service
    const user = await response;
    if (!user) {
      throw new Error('User not found');
    }

    return {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
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
 

