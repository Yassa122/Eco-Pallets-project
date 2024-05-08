// kafka/kafka.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: '1', // Make sure this is consistent with your usage
          },
        },
      },
    ]),
  ],
  // No controllers or services are typically defined here unless they are specifically for handling Kafka
})
export class KafkaModule {}
