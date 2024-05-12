import { Injectable } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  
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
    console.log("Sending message:", message);
    await this.producer.send({
      topic: 'user-login-events', // Update to the topic name subscribed to by the product-service
        messages: [
            { key: message.userId.toString(), value: JSON.stringify(message) }
        ],
    });
}

async sendAddToCart(topic: string, message: any): Promise<void> {
  console.log("Sending message:", message);
  await this.producer.send({
    topic: 'user-add-cart-events', // Update to the topic name subscribed to by the product-service
      messages: [
          { key: message.userId.toString(), value: JSON.stringify(message) }
      ],
  });
}


  getConsumer(groupId: string): Consumer {
    return this.kafka.consumer({ groupId });
  }

  async subscribeToTopic(consumer: Consumer, topic: string) {
    await consumer.connect();
    await consumer.subscribe({ topic });
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
