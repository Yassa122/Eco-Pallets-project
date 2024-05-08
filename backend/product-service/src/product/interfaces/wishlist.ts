import { Document } from 'mongoose';

export interface Wishlist extends Document {
  productId: string;
  createdAt: Date;
}
