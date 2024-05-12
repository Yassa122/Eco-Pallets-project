// src/identity/interfaces/shipping-address.interface.ts
import { Types } from 'mongoose';

export interface ShippingAddress {
  _id: Types.ObjectId;
  label: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
