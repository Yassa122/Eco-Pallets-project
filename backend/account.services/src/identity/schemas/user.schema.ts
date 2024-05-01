import mongoose, { Schema, Document } from 'mongoose';

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
    email: { type: String, required: true, unique: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    company: { type: String, required: false },
    shippingAddresses: [ShippingAddressSchema],  // Include the Shipping Address Schema here
    isEmailVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String, required: false },
    passwordResetExpires: { type: Date, required: false },
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
  isEmailVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}

