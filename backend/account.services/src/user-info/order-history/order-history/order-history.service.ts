import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IOrder, Order } from '../../schemas/order.schema';
import { OrderHistoryDTO } from '../../dto/order-history.dto';
import { User } from 'src/identity/interfaces/user';
import { OrderItemDTO } from 'src/user-info/dto/order-item.dto';

@Injectable()
export class OrderHistoryService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<IOrder>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async findUserOrders(userId: Types.ObjectId): Promise<OrderHistoryDTO[]> {
    const orders = await this.orderModel.find({ userId }).lean();
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

    return orders.map((order) => {
      return {
        orderId: order._id, // Keeping as ObjectId
        orderNumber: order.orderNumber,
        date: order.date,
        items: order.items.map(
          (item) =>
            ({
              itemId: item._id.toString(), // Assuming OrderItemDTO uses string for itemId
              itemName: item.itemName,
              quantity: item.quantity,
              price: item.price,
            }) as unknown as OrderItemDTO,
        ),
        totalAmount: order.totalAmount,
        status: order.status,
      } as OrderHistoryDTO;
    });
  }
}
