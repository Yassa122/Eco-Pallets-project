import { Document } from 'mongoose';
export interface Product extends Document {
    name: string;
    description: string;
    images: string[];
    price: number;
    availability: boolean;
    rentalOptions: {
      available: boolean;
      duration?: number;
      price?: number;
    };
  }