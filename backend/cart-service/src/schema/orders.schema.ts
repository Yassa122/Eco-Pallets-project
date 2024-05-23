import * as mongoose from 'mongoose';
import { CartItemSchema } from './cartItem.schema';

export const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    cartItems: { type: [CartItemSchema] },
    totalPrice: { type: Number },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' } // Add status field with default value 'pending'
});
