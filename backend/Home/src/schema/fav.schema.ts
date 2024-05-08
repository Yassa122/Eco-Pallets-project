import * as mongoose from 'mongoose';

export const favschema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  price: Number,
});


