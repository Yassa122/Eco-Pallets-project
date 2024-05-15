import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IOrder, Order } from 'src/user-info/schemas/order.schema'; // Ensure this is the correct path and file name
import { OrderHistoryDTO } from '../../dto/order-history.dto';
import { User } from 'src/identity/interfaces/user'; // Ensure this is the correct path and file name
import { OrderItemDTO } from 'src/user-info/dto/order-item.dto';

@Injectable()
export class OrderHistoryService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<IOrder>, // Ensure that the Order model is correctly annotated with Mongoose schema decorators
    @InjectModel('User') private userModel: Model<User>, // Make sure 'User' is correctly registered in a Mongoose module
  ) {}

  // Method to fetch orders for a user
  async findUserOrders(userId: Types.ObjectId): Promise<OrderHistoryDTO[]> {
    // Query the orders collection for orders matching the given userId
    const orders = await this.orderModel.find({ userId }).lean();

    // Transform orders into OrderHistoryDTO format
    return orders.map(
      (order) =>
        ({
          orderId: order._id.toString(), // Ensure converting _id to string if necessary
          orderNumber: order.orderNumber,
          date: order.date,
          items: order.items.map(
            (item) =>
              ({
                itemId: item._id,
                quantity: item.quantity,
                price: item.price,
              }) as unknown as OrderItemDTO,
          ),
          totalAmount: order.totalAmount,
          status: order.status,
        }) as OrderHistoryDTO,
    );
  }
}
