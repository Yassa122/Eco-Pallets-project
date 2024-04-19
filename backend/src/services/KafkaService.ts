import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";

@Injectable()
export class KafkaService implements OnModuleDestroy {
  private readonly kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
  });
  private readonly producer: Producer = this.kafka.producer();

  constructor() {
    this.connect();
  }
 
  private async connect() {
    await this.producer.connect();
  }

  async publish(topic: string, messages: any[]) {
    await this.producer.send({
      topic,
      messages: messages.map((message) => ({ value: JSON.stringify(message) })),
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
