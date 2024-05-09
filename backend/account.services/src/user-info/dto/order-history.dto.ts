import { IsNotEmpty, IsString, IsArray, IsDate, IsNumber } from 'class-validator';
import { Types } from 'mongoose';
import { OrderItemDTO } from './order-item.dto';

export class OrderHistoryDTO {
  @IsNotEmpty()
  orderId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsArray()
  items: OrderItemDTO[];

  @IsNotEmpty()
  @IsNumber()
  totalAmount: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
