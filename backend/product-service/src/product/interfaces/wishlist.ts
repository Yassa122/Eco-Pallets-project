// interfaces/wishlist.ts
import { Types } from 'mongoose';

export interface WishlistProduct {
  productId: Types.ObjectId;
  name: string;
  description: string;
  images: string[];
  price: number;
  color: string;
  size: string;
  material: string;
  availability: boolean;
  rentalOptions: {
    available: boolean;
    duration?: number;
    price?: number;
  };
  addedAt?: Date;
}

export interface Wishlist {
  userId: Types.ObjectId;
  products: WishlistProduct[];
}