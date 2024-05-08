<<<<<<< HEAD
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaModule } from './kafka/kafka/kafka.module'; // Import Kafka module
=======
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Adjust the path if necessary
import { Logger } from '@nestjs/common';
>>>>>>> main
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Create and start an HTTP server
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
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
=======
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Kafka broker list
      },
      consumer: {
        groupId: 'account-service-group' // Unique consumer group for this service
      }
    }
  });

  await app.startAllMicroservices();
  await app.listen(8000);
  Logger.log('Account Service is running on http://localhost:8000', 'Bootstrap');
}

bootstrap().catch(err => {
  Logger.error('Error starting server', err, 'Bootstrap');
  process.exit(1);
});
>>>>>>> main
