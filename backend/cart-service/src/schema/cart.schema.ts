import * as mongoose from 'mongoose';
import { CartItemSchema } from './cartItem.schema';

export const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    cartItems: { type: [CartItemSchema] },
    PromoCodeMultiplier: { type: Number, default: 1},
    Subtotal: { type: Number }, 
    totalPrice: { type: Number },
});

// Pre-save hook to calculate subtotal and total price
CartSchema.pre('save', function(next) {
    // Calculate subtotal by summing up totalPrice of each cart item
    this.Subtotal = this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
    // Calculate total price using the subtotal and PromoCodeMultiplier
    this.totalPrice = this.Subtotal * this.PromoCodeMultiplier;
    next();
});

// Ensure subtotal and totalPrice are included when converting to JSON
CartSchema.set('toJSON', { getters: true });

// Ensure subtotal and totalPrice are included when converting to Object
CartSchema.set('toObject', { getters: true });
