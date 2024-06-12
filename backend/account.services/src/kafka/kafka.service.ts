import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  emit(arg0: string, arg1: { productId: string; userId: string; }) {
    throw new Error('Method not implemented.');
  }
  awaitResponse(arg0: string, productId: string) {
    throw new Error('Method not implemented.');
  }
  private kafka: Kafka;
  private producer: Producer;
  private consumers: Consumer[] = [];

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
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  async sendMessage(topic: string, message: any): Promise<void> {
    console.log('Sending message to topic:', topic, 'message:', message);
    await this.producer.send({
      topic: topic,
      messages: [
        { key: message.userId.toString(), value: JSON.stringify(message) },
      ],
    });
  }

  getConsumer(groupId: string): Consumer {
    const consumer = this.kafka.consumer({ groupId });
    this.consumers.push(consumer);
    return consumer;
  }

  async subscribeToTopic(consumer: Consumer, topic: string): Promise<void> {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
  }

  async runConsumer(
    consumer: Consumer,
    callback: (topic: string, partition: number, message: any) => void,
  ): Promise<void> {
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message from topic: ${topic}`);
        callback(topic, partition, message);
      },
    });
  }
}
