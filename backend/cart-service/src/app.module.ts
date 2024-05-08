import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartSchema } from './schema/cart.schema';
import { CartItemSchema } from './schema/cartItem.schema';
import { promoCodesSchema } from './schema/promoCodes.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices'; // Import ClientsModule and Transport for Kafka

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets-cart'),
    MongooseModule.forFeature([
      { name: 'Cart', schema: CartSchema },
      { name: 'CartItem', schema: CartItemSchema },
      { name: 'PromoCode', schema: promoCodesSchema },
    ]),
    ClientsModule.register([ // Register Kafka client
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'], // Your Kafka broker addresses
          },
          consumer: {
            groupId: 'cart-service-group' // Unique consumer group ID for this service
          }
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
