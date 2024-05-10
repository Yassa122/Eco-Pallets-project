// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaModule } from './kafka/kafka/kafka.module'; // Import Kafka module

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { JwtAuthGuard } from './identity/strategies/jwt-auth.guard';

async function bootstrap() {
  // Create and start an HTTP server
  const app = await NestFactory.create(AppModule);
  await app.listen(8000, () => console.log('HTTP server is running on http://localhost:8000'));

  // Create a microservice for Kafka
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(KafkaModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: '2',
      },
    },
  });
  kafkaApp.listen();
  console.log('Kafka microservice is listening');
}

bootstrap();
