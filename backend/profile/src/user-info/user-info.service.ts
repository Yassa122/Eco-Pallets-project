
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
