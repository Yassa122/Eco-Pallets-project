// kafka.config.ts
import { KafkaOptions, Transport } from "@nestjs/microservices";

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: "my-app",
      brokers: ["localhost:9092"], // Replace with your Kafka broker addresses
    },
    consumer: {
      groupId: "my-group-id", // Each service should have a unique group ID or share one if they scale horizontally
    },
  },
};
