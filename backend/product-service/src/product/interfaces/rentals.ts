import { Document } from 'mongoose';
export interface Rentals extends Document {
    productId: string;
    rentStartDate: Date;
    rentEndDate: Date;
  }
  