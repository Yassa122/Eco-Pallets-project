import { Document, Types } from 'mongoose';
import { Reviews} from '../interfaces/reviews'

export interface Product extends Document {
    name: string;
    description: string;
    images: string[];
    price: number;
    color: string;
    size: string;
    material: string;
    availability: boolean;
    specifications: string[];
    rentalOptions: {
      available: boolean;
      duration?: number;
      price?: number;
    };
    reviews: Reviews[]; 
  }