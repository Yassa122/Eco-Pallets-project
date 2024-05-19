import mongoose, { Schema, Document, Types } from 'mongoose';
import {ShippingAddressSchema} from '../../user-info/schemas/shipping-address.schema'
import { ShippingAddress } from 'src/user-info/interfaces/shipping-address';


// Define the User Schema with reference to orders and reviews
export const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, optional: true },
    company: { type: String, optional: true },
    shippingAddresses: [ShippingAddressSchema],
    // orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],  // References Order documents
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishlist: { type: Schema.Types.ObjectId, ref: 'Wishlist', optional: true },
    cart: [{ type: Types.ObjectId, ref: 'Product' }], 
    isEmailVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String, optional: true },
    passwordResetExpires: { type: Date, optional: true },
  },
  {
    timestamps: true,
  },
);

export interface User extends Document {
  _id: Types.ObjectId; 
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  company?: string;
  shippingAddresses: ShippingAddress[];
  // orders: Types.ObjectId[];  
  reviews: Types.ObjectId[];  
  wishlist?: Types.ObjectId;
  cart: Types.ObjectId[];
  isEmailVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
