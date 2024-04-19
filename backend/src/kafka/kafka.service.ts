// src/kafka/kafka.service.ts
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "auth-service",
  brokers: ["localhost:9092"],
});

export const producer = kafka.producer();
