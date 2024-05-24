import mongoose, { Schema, Document, Types } from 'mongoose';
import { ShippingAddress as ImportedShippingAddress } from 'src/user-info/interfaces/shipping-address';

// ShippingAddressSchema remains unchanged
const ShippingAddressSchema = new Schema({
  label: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

export interface LocalShippingAddress {
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
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    company: { type: String },
    shippingAddresses: [ShippingAddressSchema],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishlist: { type: Schema.Types.ObjectId, ref: 'Wishlist' },
    cart: [{ type: Types.ObjectId, ref: 'Product' }], 
    isEmailVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    role: { type: String, default: "user" }, // Add role field
  },
  {
    timestamps: true,
  },
);

export interface User extends Document {
  _id: Types.ObjectId; 
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber?: string;
  company?: string;
  shippingAddresses: ImportedShippingAddress[];
  reviews: Types.ObjectId[];  
  wishlist?: Types.ObjectId;
  cart: Types.ObjectId[];

  isEmailVerified?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  role: string;
}

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
