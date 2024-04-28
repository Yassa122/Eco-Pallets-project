// src/users/schemas/user.schema.ts
import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
});

export interface User extends Document {
    name: string;
    username: string;
    password: string;
}
