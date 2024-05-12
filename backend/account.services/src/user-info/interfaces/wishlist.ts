// interfaces/wishlist.interface.ts
import { Types } from 'mongoose';

export interface WishlistProduct {
  productId: Types.ObjectId;
  addedAt: Date;
}

export interface Wishlist {
  userId: Types.ObjectId;
  products: WishlistProduct[];
}
