"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReviewSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
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
//# sourceMappingURL=review.schema.js.map