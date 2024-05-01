"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    company: { type: String, required: false },
    address: { type: String, required: false },
    isEmailVerified: { type: Boolean, default: false },
    passwordResetToken: { type: String, required: false },
    passwordResetExpires: { type: Date, required: false },
}, {
    timestamps: true,
});
