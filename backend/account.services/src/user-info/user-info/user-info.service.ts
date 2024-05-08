import { Inject, Injectable } from '@nestjs/common';
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
    constructor(
        @InjectModel('User') private userModel: Model<User>,
      ) { }

      async getUserData(id: string): Promise<User | null> {
        return this.userModel.findById(id)
          .select('firstName lastName email phoneNumber shippingAddresses')
          .exec();
    }
    
    async updateUserData(id: string, userData: GetUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
      }
      async addShippingAddress(userId: string, addressDto: AddShippingAddressDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(userId, {
            $push: { shippingAddresses: addressDto }
        }, { new: true }).exec();
    }

    async updateShippingAddress(userId: string, addressDto: UpdateShippingAddressDto): Promise<User | null> {
        try {
            const addressId = new Types.ObjectId(addressDto._id);
            const user = await this.userModel.findById(userId).exec();
    
            // Check if user exists
            if (!user) {
                console.error(`User with ID ${userId} not found.`);
                return null;
            }
    
            // Check if the shipping address exists
            const addressExists = user.shippingAddresses.some(addr => addr._id.equals(addressId));
            if (!addressExists) {
                console.error(`Address with ID ${addressDto._id} not found for user ${userId}.`);
                return null;
            }
    
            // Proceed with update
            const updatedUser = await this.userModel.findOneAndUpdate(
                { "_id": userId, "shippingAddresses._id": addressId },
                { "$set": {
                    "shippingAddresses.$.label": addressDto.label,
                    "shippingAddresses.$.address": addressDto.address,
                    "shippingAddresses.$.city": addressDto.city,
                    "shippingAddresses.$.postalCode": addressDto.postalCode,
                    "shippingAddresses.$.country": addressDto.country
                }},
                { new: true }
            ).exec();
    
            if (!updatedUser) {
                console.error('No update was necessary as the data provided matched existing data.');
                return null;
            }
    
            return updatedUser;
        } catch (error) {
            console.error('Failed to update shipping address:', error);
            throw error;
        }
    }
    
    

    async deleteShippingAddress(userId: string, addressId: Types.ObjectId): Promise<User | null> {
        if (!addressId) {
          throw new Error('Address ID must be provided');
        }
        
        try {
          const updatedUser = await this.userModel.findByIdAndUpdate(
            userId, 
            { $pull: { shippingAddresses: { _id: addressId } } },
            { new: true }
          ).exec();
          
          if (!updatedUser) {
            console.log(`No user found with ID ${userId}`);
            return null;
          }
      
          return updatedUser;
        } catch (error) {
          console.error('Error deleting shipping address:', error);
          throw error;
        }
      }
    async getShippingAddresses(userId: string): Promise<ShippingAddress[]> {
        const user = await this.userModel.findById(userId).select('shippingAddresses').exec();
        return user ? user.shippingAddresses : [];
    }
}
