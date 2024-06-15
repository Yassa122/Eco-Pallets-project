// schemas/rental.schema.ts
import { Schema, Types } from 'mongoose';

export const RentalSchema = new Schema({
  productId: {
    type: Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  rentalStart: {
    type: Date,
    required: true,
  },
  rentalEnd: {
    type: Date,
    required: true,
  },
  rentalDays: {
    type: Number,
    required: true,
  },
  //   dailyRate: {
  //     type: Number,
  //     required: true
  //   },
  deposit: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});
