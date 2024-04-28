"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const user_role_1 = __importDefault(require("./types/user-role"));
const signup_1 = __importDefault(require("./resolvers/mutations/signup"));
const mutations = (0, nexus_1.mutationType)({
    definition(t) {
        t.field("signUp", {
            type: "Boolean",
            args: {
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                userRole: (0, nexus_1.nonNull)((0, nexus_1.arg)({ type: user_role_1.default })),
            },
            resolve: signup_1.default,
        });
    },
});
exports.default = mutations;
//# sourceMappingURL=mutations.js.map