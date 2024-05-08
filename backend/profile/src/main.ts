// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaModule } from './kafka/kafka/kafka.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4000, () => console.log('HTTP server is running on http://localhost:4000'));

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(KafkaModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: '1',
      }
    }
  });
  kafkaApp.listen();
  console.log('Kafka microservice is listening');
}

bootstrap();
