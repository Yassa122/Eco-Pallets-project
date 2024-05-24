// wishlist.schema.ts
import { Schema, Types } from 'mongoose';
import { Wishlist, WishlistProduct } from '../interfaces/wishlist';

export const WishlistProductSchema = new Schema<WishlistProduct>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  material: { type: String, required: true },
  availability: { type: Boolean, required: true },
  rentalOptions: {
    available: { type: Boolean, default: false },
    duration: { type: Number },
    price: { type: Number }
  },
  addedAt: { type: Date, default: Date.now }
});

export const WishlistSchema = new Schema<Wishlist>({
  userId: Schema.Types.ObjectId,
  products: [WishlistProductSchema]
});
