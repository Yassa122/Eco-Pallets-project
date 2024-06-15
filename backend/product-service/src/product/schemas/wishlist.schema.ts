import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Schema } from 'mongoose';

export const WishlistSchema = new Schema({
  productId: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: false,
  },
  userId: {
    type: String,
    ref: 'User',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
