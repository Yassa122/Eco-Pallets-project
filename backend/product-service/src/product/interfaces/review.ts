import { Document } from 'mongoose';

export interface Review extends Document {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}