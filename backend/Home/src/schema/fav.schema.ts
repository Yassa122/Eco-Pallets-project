import * as mongoose from 'mongoose';
import { ItemSchema } from './items.schema';

export const favschema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: [ItemSchema], default: [] },
  id:  {type: String},
});