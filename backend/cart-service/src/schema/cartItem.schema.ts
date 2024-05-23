
import * as mongoose from 'mongoose';

export const CartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    totalPrice: { type: Number, default: function() { return this.quantity * this.price; } },
    image: { type: String } // Add image attribute
  });