"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistSchema = exports.WishlistProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.WishlistProductSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
    availability: { type: Boolean, required: true },
    rentalOptions: {
        available: { type: Boolean, default: false },
        duration: { type: Number },
        price: { type: Number }
    },
    addedAt: { type: Date, default: Date.now }
});
exports.WishlistSchema = new mongoose_1.Schema({
    userId: mongoose_1.Schema.Types.ObjectId,
    products: [exports.WishlistProductSchema]
});
//# sourceMappingURL=wishlist.schema.js.map