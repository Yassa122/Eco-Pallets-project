import { Document } from 'mongoose';

interface RentalOptions {
  available: boolean;
  duration?: number;
  price?: number;
  deposit?: number;
}

export interface Product extends Document {
  name: string;
  description: string;
  images: string[];
  price: number;
  color: string;
  size: string;
  material: string;
  availability: boolean;
  rentalOptions: RentalOptions;
  category: string;
}
