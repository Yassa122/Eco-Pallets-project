import { Injectable } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka = new Kafka({
    clientId: 'app-client', 
    brokers: ['localhost:9092'],
  });

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
