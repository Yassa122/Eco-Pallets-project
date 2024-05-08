import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  price: Number,
});

