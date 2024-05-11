import { Schema, Document } from 'mongoose';

export const Review = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product', index: true }, // Added index
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User', index: true }, // Added index
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export interface ReviewDoc extends Document {
  productId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
