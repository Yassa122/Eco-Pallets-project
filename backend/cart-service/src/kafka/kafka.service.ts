import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Consumer, Kafka } from 'kafkajs';
import { Model } from 'mongoose';
import { CreateCartDto } from '../dto/cart.dto';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private kafkaClient: Kafka;
  private consumer: Consumer;

  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<any>
  ) {
    this.kafkaClient = new Kafka({
      clientId: 'cart-service',
      brokers: ['localhost:9092'], // Update brokers as necessary
    });

    this.consumer = this.kafkaClient.consumer({
      groupId: 'cart-service-group',
    });
  }

  async onModuleInit() {
    await this.consumer
      .connect()
      .then(() => console.log('Connected to Kafka successfully'))
      .catch((err) => console.error('Failed to connect to Kafka', err));

    // Setup topic subscription and message handler here
    await this.consumer.subscribe({
      topic: 'user-registered',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
        const { userId } = JSON.parse(message.value.toString());

        // Create a new cart for the user
        const createCartDto: CreateCartDto = {
          userId, cartItems: [],
          totalPrice: 0,
          Subtotal: 0,
          PromoCodeMultiplier: 0,
        };
        const createdCart = new this.cartModel(createCartDto);
        await createdCart.save();
        console.log(`Cart created for user ID ${userId}`);
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
