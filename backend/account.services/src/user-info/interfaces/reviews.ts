import { Schema, Types } from "mongoose";

export interface Reviews extends Document {
    _id: Types.ObjectId;
    productId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  