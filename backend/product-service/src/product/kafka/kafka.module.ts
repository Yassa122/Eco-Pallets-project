// src/product/kafka/product-kafka.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'], // Adjust the broker address if needed
          },
          consumer: {
            groupId: 'product-service-group', // Unique group id for this service
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class ProductKafkaModule {}
