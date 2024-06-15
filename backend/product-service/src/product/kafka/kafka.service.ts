import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafkaClient: Kafka;
  private readonly producer: Producer;
  private readonly consumers: Consumer[] = [];
  private readonly logger = new Logger(KafkaService.name);

  constructor() {
    this.kafkaClient = new Kafka({
      clientId: 'product-service',
      brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    });
    this.producer = this.kafkaClient.producer();
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
    this.logger.log(
      `Sending message to topic: ${topic}, message: ${JSON.stringify(message)}`,
    );
    await this.producer.send({
      topic,
      messages: [
        {
          key: message.userId?.toString() || '',
          value: JSON.stringify(message),
        },
      ],
    });
  }

  getConsumer(groupId: string): Consumer {
    const consumer = this.kafkaClient.consumer({ groupId });
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
        this.logger.log(`Received message from topic: ${topic}`);
        callback(topic, partition, message);
      },
    });
  }
}
