import { Types, Schema } from "mongoose";

export const WishlistSchema = new Schema({
    productId: {
        type: Types.ObjectId,
        ref: 'Product',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});