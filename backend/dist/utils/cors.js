"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: process.env.FRONTEND_URL ?? "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};
exports.default = (0, cors_1.default)(corsOptions);
//# sourceMappingURL=cors.js.map