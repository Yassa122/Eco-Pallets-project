import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: string; // Use 'string', not 'String'
  readonly lastName: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  phoneNumber?: string; // Optional field
  company?: string; // Optional field
  address?: string; // Optional field
  isEmailVerified?: boolean; // Default is false, optional
  passwordResetToken?: string; // Optional for password resets
  passwordResetExpires?: Date; // Optional for password resets
}
