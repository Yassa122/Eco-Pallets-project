import * as mongoose from 'mongoose';
export const promoCodesSchema = new mongoose.Schema({
    promoCode: { type: String, required: true },
    discountInPercent: { type: Number, required: true }
  });