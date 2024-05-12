import { Document, Types } from 'mongoose';

export interface Order extends Document {
    orderNumber: string;
    date: Date;
    items: Array<{
      id: Types.ObjectId;
      itemName: string;
      quantity: number;
      price: number;
    }>;
    totalAmount: number;
    status: string;
  }