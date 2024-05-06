import { Injectable } from '@nestjs/common';
import { KafkaService } from '../../../kafka/kafka.service'; // Adjust path as necessary
import { ShippingAddressDto } from 'src/dto/shipping-address.dto';

@Injectable()
export class UserInfoService {
  constructor(private kafkaService: KafkaService) {}

  async getProfileInfo(userId: string): Promise<any> {
    const requestTopic = 'requestProfileInfo';
    const responseTopic = `responseProfileInfo-${userId}`;
    this.kafkaService.sendMessage(requestTopic, { userId, responseTopic });
    // Assume the Kafka consumer setup to handle the response is elsewhere
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
