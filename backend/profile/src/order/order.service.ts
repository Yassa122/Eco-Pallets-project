import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../interfaces/order';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async findAllOrders(userId: string): Promise<Order[]> {
    return this.orderModel.find({ user: userId }).exec();
  }
}
