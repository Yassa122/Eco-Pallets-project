import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private kafkaClient: Kafka;
  private consumer: Consumer;

  constructor() {
    this.kafkaClient = new Kafka({
      clientId: 'product-service',
      brokers: ['localhost:9092'],
    });
    this.consumer = this.kafkaClient.consumer({
      groupId: 'product-service-group',
    });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'user-login-events',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const user = JSON.parse(message.value.toString());
        console.log(`User logged in: ${user.userId}`);
        console.log(`Received message: ${message.value.toString()}`);
        // Implement your message handling logic here
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
