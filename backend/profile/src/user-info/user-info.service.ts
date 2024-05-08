import { Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { ShippingAddressDto } from 'src/dto/shipping-address.dto'; 
import { ClientKafka } from '@nestjs/microservices';
import { UpdateProfileDto } from 'src/dto/update-profile-info.dto';
import { ShippingAddressDto } from 'src/dto/shipping-address.dto';


@Injectable()
export class UserInfoService implements OnModuleInit {
  constructor(@Inject('ACCOUNT_SERVICE') private readonly client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf('getUserData');
    this.client.subscribeToResponseOf('updateUserData');
    this.client.subscribeToResponseOf('addShippingAddress');
    this.client.subscribeToResponseOf('removeShippingAddress');
    this.client.subscribeToResponseOf('updateShippingAddress');
    this.client.subscribeToResponseOf('getShippingAddresses');



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

    async addShippingAddress(userId: string, addressDto: ShippingAddressDto): Promise<any> {
      return this.client.send('addShippingAddress', { userId, addressDto }).toPromise();
    }
  
    async removeShippingAddress(userId: string, addressLabel: string): Promise<any> {
      return this.client.send('removeShippingAddress', { userId, addressLabel }).toPromise();
    }
  
    async updateShippingAddress(userId: string, addressIndex: number, addressDto: ShippingAddressDto): Promise<any> {
      const updatedShippingAddress = await this.client.send('updateShippingAddress', { userId, addressIndex, addressDto }).toPromise();
      return updatedShippingAddress;
    }
  
    async getShippingAddresses(userId: string): Promise<any> {
      const shippingAddresses = await this.client.send('getShippingAddresses', { userId }).toPromise();
      return shippingAddresses;
    }

}



 

