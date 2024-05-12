import { Schema, Document, model } from 'mongoose';

interface IOrderItem {
  _id: Schema.Types.ObjectId;
  itemName: String;
  quantity: Number;
  price: Number;
}

export interface IOrder extends Document {
  orderNumber: string;
  date: Date;
  items: IOrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export const OrderSchema = new Schema<IOrder>({
  orderNumber: { type: String, required: true },
  date: { type: Date, required: true },
  items: [
    {
      _id: { type: Schema.Types.ObjectId, required: true, auto: true },
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
});

export const Order = model<IOrder>('Order', OrderSchema);
