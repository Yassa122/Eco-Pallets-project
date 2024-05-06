import { Types } from 'mongoose';

export class OrderItemDto {
  id: Types.ObjectId;
  itemName: string;
  quantity: number;
  price: number;
}

export class OrderDto {
  orderNumber: string;
  date: Date;
  items: OrderItemDto[];
  totalAmount: number;
  status: string;
}
