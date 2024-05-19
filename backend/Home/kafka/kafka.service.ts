// src/kafka/kafka.consumer.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private kafkaClient: Kafka;
  private consumer: Consumer;

  constructor() {
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
      topic: 'user-login-events',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });
        // Handle the incoming message
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
