import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../account.services/src/identity/schemas/user.schema';  // Import the User interface

@Injectable()
export class ProfileService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

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
}
