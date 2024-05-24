import { Schema } from "mongoose";

// ShippingAddressSchema remains unchanged
export const ShippingAddressSchema = new Schema({
    label: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  });
  
  