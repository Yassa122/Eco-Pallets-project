import { Document } from 'mongoose';
import { ShippingAddress } from 'src/user-info/interfaces/shipping-address';

export interface User extends Document {
  [x: string]: any;
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  phoneNumber?: string;
  company?: string;
  shippingAddresses: ShippingAddress[];
  isEmailVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  role: string; // Add role field
}
