"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistSchema = void 0;
const mongoose_1 = require("mongoose");
exports.WishlistSchema = new mongoose_1.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=wishlist.schema.js.map