import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserInfoService } from './user-info/user-info.service'; // Ensure the path is correct
import { ShippingAddressDto } from 'src/dto/shipping-address.dto'; // Adjust path as necessary
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private userInfoService: UserInfoService,
    @Inject('PROFILE_SERVICE_KAFKA') private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('user-info-topic');
    await this.kafkaClient.connect();
    this.logger.log('Connected to Kafka and subscribed to user-info-topic');
  }

  @MessagePattern('user-info-topic')
  async handleUserInfoMessage(@Payload() message: any) {
    try {
      const userInfo = JSON.parse(message.value);
      this.logger.log('Received user info:', userInfo);
      // You could save this to a database or cache here, if needed
    } catch (error) {
      this.logger.error(
        'Failed to process user info message',
        (error as Error).stack,
      );
    }
  }

  async getUserInfo(id: string): Promise<any> {
    try {
      return await this.userInfoService.getProfileInfo(id);
    } catch (error) {
      this.logger.error(
        `Error fetching user info for ID ${id}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async addUserShippingAddress(
    userId: string,
    addressDto: ShippingAddressDto,
  ): Promise<void> {
    try {
      await this.userInfoService.addShippingAddress(userId, addressDto);
      this.logger.log(`Shipping address added for user ${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to add shipping address for user ${userId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async removeUserShippingAddress(
    userId: string,
    addressLabel: string,
  ): Promise<void> {
    try {
      await this.userInfoService.removeShippingAddress(userId, addressLabel);
      this.logger.log(`Shipping address removed for user ${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to remove shipping address for user ${userId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  async updateUserShippingAddress(
    userId: string,
    addressIndex: number,
    addressDto: ShippingAddressDto,
  ): Promise<void> {
    try {
      await this.userInfoService.updateShippingAddress(
        userId,
        addressIndex,
        addressDto,
      );
      this.logger.log(`Shipping address updated for user ${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to update shipping address for user ${userId}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  // getUser(getUserRequest:GetUserRequest){
  //   return this.users.find((user)=>user.userId===getUserRequest.userId);
  // }
}
