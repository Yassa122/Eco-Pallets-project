import { Schema, Document, Types } from 'mongoose';

export const OrderSchema = new Schema({
  orderNumber: { type: String, required: true },
  date: { type: Date, required: true },
  items: [{
    _id: { type: Schema.Types.ObjectId, required: true, auto: true },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
});

