
import { Document } from 'mongoose';

export interface Identity extends Document {
   readonly name: String;
   readonly username: String;
   readonly password: String;
}