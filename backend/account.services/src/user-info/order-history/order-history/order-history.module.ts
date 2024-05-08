// src/order-history/order-history.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderHistoryService } from './order-history.service';
import { OrderHistoryController } from './order-history.controller';
import { Order, OrderSchema } from '../../schemas/order.schema';
import { UserSchema } from 'src/identity/schemas/user.schema';

@Module({
  imports: [
  MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])],
  controllers: [OrderHistoryController],
  providers: [OrderHistoryService],
  exports: [OrderHistoryService] // Make sure it's exported if used outside this module
})
export class OrderHistoryModule {}
