import mongoose, { Document, Schema } from 'mongoose';

interface OrderItem {
  productId: mongoose.Types.ObjectId;  // Reference to a product document
  quantity: number;
  price: number;
}

export interface Order extends Document {
  orderNumber: string;
  date: Date;
  items: OrderItem[];
  totalAmount: number;
  status: string;
}

export const OrderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    date: { type: Date, required: true, default: Date.now },
    items: [{
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Completed', 'Cancelled'],
      default: 'Pending'
    },
  },
  {
    timestamps: true,  // Automatically manage createdAt and updatedAt timestamps
  }
);
