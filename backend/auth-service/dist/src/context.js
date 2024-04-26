"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const client_1 = require("@prisma/client");
const user_auth_1 = __importDefault(require("./lib/user-auth"));
const prisma = new client_1.PrismaClient();
const createContext = async (initialContext) => {
    const user = initialContext.request
        ? await (0, user_auth_1.default)(prisma, initialContext.request)
        : null;
    return {
        ...initialContext,
        prisma,
        user,
    };
};
exports.createContext = createContext;
exports.default = exports.createContext;
//# sourceMappingURL=context.js.map