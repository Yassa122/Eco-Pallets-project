"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("graphql/error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = async (_, { email, password }, ctx) => {
    const { prisma, req, res } = ctx;
    if (!email) {
        throw new error_1.GraphQLError("Email is required");
    }
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new error_1.GraphQLError("User not found");
    }
    if (!user.password) {
        throw new error_1.GraphQLError("Password not set for this user, please contact support.");
    }
    const passwordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new error_1.GraphQLError("Invalid password");
    }
    return {};
};
exports.default = login;
//# sourceMappingURL=login.js.map