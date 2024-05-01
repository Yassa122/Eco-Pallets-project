import mongoose, { Schema, Document } from 'mongoose';

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
