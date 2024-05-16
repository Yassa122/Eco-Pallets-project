import { Document } from 'mongoose';
import { ShippingAddress } from 'src/user-info/interfaces/shipping-address';

export interface User extends Document {
  [x: string]: any;
  readonly id: string;
  readonly firstName: string; // Use 'string', not 'String'
  readonly lastName: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  phoneNumber?: string; // Optional field
  company?: string; // Optional field
  shippingAddresses: ShippingAddress[];
  isEmailVerified?: boolean; // Default is false, optional
  passwordResetToken?: string; // Optional for password resets
  passwordResetExpires?: Date; // Optional for password resets
}
