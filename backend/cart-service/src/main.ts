import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
<<<<<<< HEAD
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options:{
      client:{
        brokers: ['localhost:9092']
      },
      consumer:{
        groupId:'product-cart',
      }

    }
  }
  );
   app.listen();
=======
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Assuming your React app runs on localhost:3000
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Accept, Authorization',
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

  await app.startAllMicroservices();
  await app.listen(7000);
>>>>>>> origin/main
}
bootstrap();
  