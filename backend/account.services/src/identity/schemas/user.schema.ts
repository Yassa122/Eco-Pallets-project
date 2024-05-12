import mongoose, { Schema, Document, Types } from 'mongoose';

// ShippingAddressSchema remains unchanged
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
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],  // References Order documents
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }], // Array to store references to Review documents
    isEmailVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String, optional: true },
    passwordResetExpires: { type: Date, optional: true },
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
  orders: Types.ObjectId[];  // Array of Order references
  reviews: Types.ObjectId[];  // Array of Review references
  isEmailVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
