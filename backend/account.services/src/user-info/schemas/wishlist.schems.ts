// wishlist.schema.ts
import { Schema } from 'mongoose';
import { Wishlist, WishlistProduct } from '../interfaces/wishlist';

export const WishlistSchema = new Schema<Wishlist>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  products: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    addedAt: { type: Date, default: Date.now }
  }]
});
