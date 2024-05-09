// src/orders/order-history.controller.ts
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { OrderHistoryService } from './order-history.service';
import { OrderHistoryDTO } from '../../dto/order-history.dto';
import { Types } from 'mongoose';
import { CreateOrderDTO } from 'src/user-info/dto/create-order.dto';
import { Order } from 'src/user-info/schemas/order.schema';
import mongoose from 'mongoose';

@Controller('/orders')
export class OrderHistoryController {
  constructor(private readonly orderHistoryService: OrderHistoryService) {}

  // @Post(':userId')
  // async createOrder(@Param('userId') userId: string, @Body() createOrderDto: CreateOrderDTO): Promise<any> {
  //   return this.orderHistoryService.createOrder(createOrderDto, userId);
  // }

  @Get(':userId')
  async getUserOrderHistory(@Param('userId') userId: string): Promise<OrderHistoryDTO[]> {
    // Convert userId from string to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    return this.orderHistoryService.findUserOrders(userObjectId);
  }
}
