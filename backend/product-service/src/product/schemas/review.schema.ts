
import { Schema, Types } from 'mongoose';

export const ReviewSchema = new Schema({
    productId: {
        type: Types.ObjectId,
        ref: 'Product',
        required: false
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: false
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
