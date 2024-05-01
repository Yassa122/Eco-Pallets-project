import * as mongoose from 'mongoose';
import { CartItemSchema } from './cartItem.schema'; // Import the CartItem schema

export const CartSchema = new mongoose.Schema({
    userId: { type: String }, // For registered users
    sessionId: { type: String }, // For guest users
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    cartItems: [CartItemSchema], // Array of CartItemSchema
});
