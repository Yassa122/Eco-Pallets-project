import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../identity/interfaces/user';
import { GetUserDto } from 'src/user-info/dto/get-user.dto';
import { AddShippingAddressDto } from '../dto/add-shipping-address.dto';
import { DeleteShippingAddressDto } from '../dto/delete-shipping-address.dto';
import { UpdateShippingAddressDto } from '../dto/update-shipping-address.dto';
import { ShippingAddress } from '../interfaces/shipping-address';

@Injectable()
export class UserInfoService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async getUserData(userId: string): Promise<User | null> {
    return this.userModel
      .findById(userId)
      .exec();
  }

  async updateUserData(userId: string, userData: GetUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, userData, { new: true })
      .exec();
  }

  async updateUserDataByEmail(email: string, userData: GetUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email });
    // If user is not found, return null or handle the error appropriately
    if (!user) {
      return null;
    }
    // Update user data
    user.set(userData);

    // Save the updated user data
    await user.save();

    // Return the updated user
    return user;     
}
  async addShippingAddress(
    userId: string,
    addressDto: AddShippingAddressDto,
  ): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $push: { shippingAddresses: addressDto } },
        { new: true, upsert: true }, // Ensure 'upsert' is set appropriately
      )
      .exec();
  }

  async updateShippingAddress(
    userId: string,
    addressDto: UpdateShippingAddressDto,
  ): Promise<User | null> {
    const addressId = new Types.ObjectId(addressDto._id);
    const updateData = {
      'shippingAddresses.$.label': addressDto.label,
      'shippingAddresses.$.address': addressDto.address,
      'shippingAddresses.$.city': addressDto.city,
      'shippingAddresses.$.postalCode': addressDto.postalCode,
      'shippingAddresses.$.country': addressDto.country,
    };

    return this.userModel
      .findOneAndUpdate(
        { _id: userId, 'shippingAddresses._id': addressId },
        { $set: updateData },
        { new: true },
      )
      .exec();
  }

  async deleteShippingAddress(
    userId: string,
    addressId: string,
  ): Promise<User | null> {
    const objectId = new Types.ObjectId(addressId); // Correct conversion here
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { shippingAddresses: { _id: objectId } } },
        { new: true },
      )
      .exec();
  }

  async getShippingAddresses(userId: string): Promise<ShippingAddress[]> {
    const user = await this.userModel
      .findById(userId)
      .select('shippingAddresses')
      .exec();
    return user ? user.shippingAddresses : [];
  }
}
