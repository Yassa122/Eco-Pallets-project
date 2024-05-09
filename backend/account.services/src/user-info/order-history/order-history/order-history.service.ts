// src/orders/order-history.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { OrderSchema } from '../../schemas/order.schema';
import { Order } from 'src/user-info/interfaces/order';
import { OrderHistoryDTO } from '../../dto/order-history.dto';
import { CreateOrderDTO } from 'src/user-info/dto/create-order.dto';
import { User } from 'src/identity/interfaces/user';
import { OrderItemDTO } from 'src/user-info/dto/order-item.dto';

@Injectable()
export class OrderHistoryService {
  constructor(
    @InjectModel('Order') private orderModel: Model<Order>,
    @InjectModel('User') private userModel: Model<User>
) {}

// async createOrder(createOrderDto: CreateOrderDTO, userId: string): Promise<Order> {
//     const createdOrder = new this.orderModel(createOrderDto);
//     const order = await createdOrder.save();

//     // Add order ID to the user's orders array
//     await this.userModel.findByIdAndUpdate(
//       userId,
//       { $push: { orders: order._id } },
//       { new: true, useFindAndModify: false }
//     );

//     return order;
//   }

async findUserOrders(userId: mongoose.Types.ObjectId): Promise<OrderHistoryDTO[]> {
  // Query the orders collection for orders matching the given userId
  const orders = await this.orderModel.find({ userId }).lean();

  // Transform orders into OrderHistoryDTO format
  return orders.map(order => ({
    orderId: order._id,
    orderNumber: order.orderNumber,
    date: order.date,
    items: order.items.map(item => ({
      itemId: item.id,
      quantity: item.quantity,
      price: item.price,
    } as OrderItemDTO)),
    totalAmount: order.totalAmount,
    status: order.status,
  } as OrderHistoryDTO));
}
}
