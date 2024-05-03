import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShippingAddressDto } from 'src/dto/shipping-address.dto';
import { User } from '../../../account.services/src/identity/schemas/user.schema'; 

// user.service.ts

@Injectable()
export class UserInfoService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getProfileInfo(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      address: user.shippingAddresses,
      phoneNumber: user.phoneNumber,
    };
  }

  async addShippingAddress(userId: string, addressDto: ShippingAddressDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    user.shippingAddresses.push(addressDto);
    return user.save();
  }

  async removeShippingAddress(userId: string, addressLabel: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    user.shippingAddresses = user.shippingAddresses.filter(address => address.label !== addressLabel);
    return user.save();
  }

  async updateShippingAddress(userId: string, addressIndex: number, addressDto: ShippingAddressDto): Promise<User> {
    const user = await this.userModel.findById(userId);
    user.shippingAddresses[addressIndex] = addressDto;
    return user.save();
  }
}

