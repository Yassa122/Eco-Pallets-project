// kafka.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Kafka, logLevel } from "kafkajs";

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
    logLevel: logLevel.ERROR,
  });

  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({ groupId: "test-group" });

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  async sendMessage(topic: string, messages: any[]) {
    await this.producer.send({
      topic,
      messages: messages.map((message) => ({ value: JSON.stringify(message) })),
    });
  }

  async consumeMessages(topic: string, handler: (message: any) => void) {
    await this.consumer.subscribe({ topic, fromBeginning: true });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        handler(JSON.parse(message.value.toString()));
      },
    });
  }
}
