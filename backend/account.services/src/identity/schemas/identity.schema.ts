
import * as mongoose from 'mongoose';

export const Identityschema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
});
