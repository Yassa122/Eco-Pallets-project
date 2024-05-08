import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer, Producer, EachMessagePayload } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private consumer: Consumer;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'user-info-client',
      brokers: ['localhost:9092'],
    });

    this.consumer = this.kafka.consumer({ groupId: 'user-info-group' });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  // Start consuming messages from a specific topic
  async startConsuming(topic: string, callback: (payload: EachMessagePayload) => Promise<void>): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async (payload) => {
        await callback(payload);
      },
    });
  }

  // Stop the consumer
  async stopConsuming(): Promise<void> {
    await this.consumer.disconnect();
    await this.consumer.connect();  // Reconnect if you need to consume again later
  }
  async sendMessage(topic: string, message: any): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      console.log(`Message sent to topic ${topic}:`, message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async consumeMessages(
    topic: string,
    fromBeginning: boolean = false,
  ): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message && message.value) {
          console.log(`Received message from ${topic}:`, message.value.toString());
        }
      },
    });
  }

  async onMessage(
    topic: string,
    callback: (payload: EachMessagePayload) => Promise<void>,
  ): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async (payload) => {
        try {
          await callback(payload);
          if (payload.message && payload.message.value) {
            console.log('Message processed:', payload.message.value.toString());
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      },
    });
  }
}
