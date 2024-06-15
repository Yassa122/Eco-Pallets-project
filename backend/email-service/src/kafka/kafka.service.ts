import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'app-client',
      brokers: ['localhost:9092'],
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async sendMessage(topic: string, message: any): Promise<void> {
    console.log('Sending message:', message);
    await this.producer.send({
      topic: topic,
      messages: [
        { key: message.userId ? message.userId.toString() : null, value: JSON.stringify(message) },
      ],
    });
  }

  getConsumer(groupId: string): Consumer {
    return this.kafka.consumer({ groupId });
  }

  async subscribeToTopic(consumer: Consumer, topic: string) {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    return consumer;
  }

  async runConsumer(consumer: Consumer, callback: Function) {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        callback(topic, partition, message);
      },
    });
  }
}
