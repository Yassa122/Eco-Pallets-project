"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
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
        enum: ['Red', 'Blue', 'Green'],
        required: true,
    },
    size: {
        type: String,
        enum: ['800 x 1200', '1000 x 1200', '1067 x 1067'],
        required: true,
    },
    material: {
        type: String,
        enum: ['hdpe', 'PP', 'PVC'],
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
        deposit: {
            type: Number,
            require: false,
        }
    }
});
//# sourceMappingURL=product.schema.js.map