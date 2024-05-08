import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from '../dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':userId')
  async getAllOrders(@Param('userId') userId: string): Promise<OrderDto[]> {
    const orders = await this.orderService.findAllOrders(userId);
    return orders.map(order => ({
      orderNumber: order.orderNumber,
      date: order.date,
      items: order.items,
      totalAmount: order.totalAmount,
      status: order.status
    }));
  }
}
