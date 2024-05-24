import { Document } from 'mongoose';

export interface Wishlist extends Document {
  productId: string;
  userId: string;
  createdAt: Date;
}
