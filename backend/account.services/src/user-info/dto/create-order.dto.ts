// src/orders/dto/create-order.dto.ts
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';

class OrderItemCreateDTO {
  @IsMongoId()
  productId: mongoose.Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  orderNumber: string;

  @IsDateString()
  date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemCreateDTO)
  items: OrderItemCreateDTO[];

  @IsNumber()
  totalAmount: number;

  @IsEnum(['Pending', 'Completed', 'Cancelled'])
  status: string;
}
