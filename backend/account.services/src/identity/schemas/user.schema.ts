import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    company: { type: String, required: false },
    address: { type: String, required: false },
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
  address?: string;
  isEmailVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  // Include other fields
}
