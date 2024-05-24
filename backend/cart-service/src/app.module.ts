import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartSchema } from './schema/cart.schema';
import { CartItemSchema } from './schema/cartItem.schema';
import { promoCodesSchema } from './schema/promoCodes.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices'; // Import ClientsModule and Transport for Kafka
import { CartKafkaModule } from './kafka/kafka.module'; // Import KafkaModule
import { KafkaConsumerService } from './kafka/kafka.service';
import { orderSchema } from './schema/orders.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets-E-commerce'),
    MongooseModule.forFeature([
      { name: 'Cart', schema: CartSchema },
      { name: 'CartItem', schema: CartItemSchema },
      { name: 'PromoCode', schema: promoCodesSchema },
      { name: 'Order', schema: orderSchema },

    ]),
    CartKafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, KafkaConsumerService],
})
export class AppModule {}
 