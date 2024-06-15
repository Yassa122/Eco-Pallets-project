import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  productId: Number,
  name: String,
  image: String,
  price: Number,
});

