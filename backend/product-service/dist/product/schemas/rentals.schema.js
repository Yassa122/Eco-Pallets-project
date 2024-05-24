"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RentalSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rentalStart: {
        type: Date,
        required: true
    },
    rentalEnd: {
        type: Date,
        required: true
    },
    rentalDays: {
        type: Number,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
});
//# sourceMappingURL=rentals.schema.js.map