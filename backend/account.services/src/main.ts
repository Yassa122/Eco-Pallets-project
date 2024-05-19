import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { AppModule } from './app.module';
=======
import { AppModule } from './app.module'; // Adjust the path if necessary
import { Logger } from '@nestjs/common';
>>>>>>> e77d17d9dcf178cad4213d23c10cc322e58c1aba
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Assuming your React app runs on localhost:3000
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
<<<<<<< HEAD
    allowedHeaders: 'Content-Type,Accept,Authorization',
=======
    allowedHeaders: 'Content-Type, Accept',
>>>>>>> e77d17d9dcf178cad4213d23c10cc322e58c1aba
    credentials: true, // This allows the server to send cookies
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'], // Kafka broker list
      },
      consumer: {
        groupId: 'account-service-group', // Unique consumer group for this service
      },
    },
  });
<<<<<<< HEAD

  await app.startAllMicroservices();
  await app.listen(8000);
}
bootstrap();
  
=======

  await app.startAllMicroservices();
  await app.listen(8000);
  Logger.log(
    'Account Service is running on http://localhost:8000',
    'Bootstrap',
  );
}

bootstrap().catch((err) => {
  Logger.error('Error starting server', err, 'Bootstrap');
  process.exit(1);
});
>>>>>>> e77d17d9dcf178cad4213d23c10cc322e58c1aba
