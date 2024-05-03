import { MongooseModule, InjectModel, getModelToken } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrderSchema } from '../schemas/order.schema'
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'ORDER_MODEL',
      useFactory: (model) => model,
      inject: [getModelToken('Order')]  // Correctly reference the model token
    }
  ],
})
export class OrderModule {}
//k