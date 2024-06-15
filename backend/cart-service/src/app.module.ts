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
    MongooseModule.forRoot('mongodb+srv://Admin:98pE-8FZADg8bbZ@eco-pallets.saefewe.mongodb.net/plastic-pallets-cart?retryWrites=true&w=majority&appName=Eco-Pallets'),
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
 