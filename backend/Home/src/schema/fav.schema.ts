import * as mongoose from 'mongoose';

export const favschema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: String,
  id: Number,
  name: String,
  image: String,
  price: Number,
});


