import {Schema} from 'mongoose';

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
    availability: {
        type: Boolean,
        default: true
    },
    specifications: {
        type: [String],
        default: []
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
    }
});
