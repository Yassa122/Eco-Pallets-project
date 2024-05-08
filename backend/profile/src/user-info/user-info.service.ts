<<<<<<< HEAD
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



 

=======
import { Injectable } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service'; // Adjust path as necessary
import { ShippingAddressDto } from 'src/dto/shipping-address.dto';

@Injectable()
export class UserInfoService {
  constructor(private kafkaService: KafkaService) {}

  async getProfileInfo(id: string): Promise<any> {
    const responseTopic = `responseProfileInfo-${id}`;
    const timeoutDuration = 5000; // Timeout after 5000 ms

    return new Promise((resolve, reject) => {
      let timeoutHandle = setTimeout(async () => {
        await this.kafkaService.stopConsuming();
        reject(
          new Error(
            `Timeout while waiting for response on topic ${responseTopic}`,
          ),
        );
      }, timeoutDuration);

      this.kafkaService
        .startConsuming(responseTopic, async (payload) => {
          clearTimeout(timeoutHandle);
          await this.kafkaService.stopConsuming(); // Stop consuming after receiving the message
          try {
            const value = payload.message?.value;
            if (value) {
              const message = JSON.parse(value.toString());
              resolve(message);
            } else {
              reject(new Error('Payload message value is null'));
            }
          } catch (error) {
            reject(
              new Error(
                'Failed to parse user info: ' + (error as Error).message,
              ),
            ); // Add type assertion to 'error'
          }
        })
        .catch(reject);
    });
  }

  async modifyShippingAddress(
    userId: string,
    action: string,
    addressData: ShippingAddressDto | string,
    addressIndex?: number,
  ): Promise<void> {
    const topic = 'modifyUserShippingAddress';
    const message = {
      action, // 'add', 'remove', or 'update'
      userId,
      addressData,
      addressIndex, // Optional, used for updating
    };

    // Send modification request to account service
    await this.kafkaService.sendMessage(topic, message);
  }

  // These methods were probably missed in the class. Ensure they are added:
  async addShippingAddress(
    userId: string,
    addressDto: ShippingAddressDto,
  ): Promise<void> {
    return this.modifyShippingAddress(userId, 'add', addressDto);
  }

  async removeShippingAddress(
    userId: string,
    addressLabel: string,
  ): Promise<void> {
    return this.modifyShippingAddress(userId, 'remove', addressLabel);
  }

  async updateShippingAddress(
    userId: string,
    addressIndex: number,
    addressDto: ShippingAddressDto,
  ): Promise<void> {
    return this.modifyShippingAddress(
      userId,
      'update',
      addressDto,
      addressIndex,
    );
  }
}
>>>>>>> main
