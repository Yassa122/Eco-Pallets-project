import mongoose, { Schema, Document } from 'mongoose';
import { Order } from 'src/user-info/schemas/order.schema';
import { Review} from 'src/user-info/schemas/review.schema';  // Adjust the path as necessary

// Define the Shipping Address Schema
const ShippingAddressSchema = new Schema({
  label: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

export interface ShippingAddress {
  label: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

// Define the User Schema
export const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    company: { type: String },
    shippingAddresses: [ShippingAddressSchema],  // Include the Shipping Address Schema here
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],  // Reference to the Order model
    isEmailVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],  // Reference to the Review model
  },
  {
    timestamps: true,
  },
);

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  company?: string;
  shippingAddresses: ShippingAddress[];
  orders: mongoose.Types.ObjectId[]; 
  isEmailVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  reviews: mongoose.Types.ObjectId[];  // Array of ObjectIds referencing Reviews
}
