import {Schema} from 'mongoose';
import { ReviewSchema} from './review.schema';
export const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        enum:['Red', 'Blue', 'Green'],
        required: true,
    },
    size: {
        type: String,
        enum: ['800 x 1200', '1000 x 1200', '1067 x 1067'],
        required: true,
    },
    material: {
        type: String,
        enum:['hdpe', 'PP', 'PVC'],
        required: true,
    },
    availability: {
        type: Boolean,
        default: true
    },
    rentalOptions: {
        available: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number
        },
        price: {
            type: Number
        }
    },
    reviews: {
        type: [ReviewSchema],
        default: []
      }
});
