import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CART_SERVICE_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'cart-service-group', // Unique group id for this service
          },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class CartKafkaModule {}
