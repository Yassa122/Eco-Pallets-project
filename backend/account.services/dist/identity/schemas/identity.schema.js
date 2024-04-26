"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identityschema = void 0;
const mongoose = require("mongoose");
exports.Identityschema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
});
//# sourceMappingURL=identity.schema.js.map