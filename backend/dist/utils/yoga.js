"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const plugin_disable_introspection_1 = require("@graphql-yoga/plugin-disable-introspection");
const context_1 = require("../context");
const schema_1 = __importDefault(require("./schema"));
const yoga = (0, graphql_yoga_1.createYoga)({
    schema: schema_1.default,
    context: async (initialContext) => await (0, context_1.createContext)(initialContext),
    plugins: [
        (0, plugin_disable_introspection_1.useDisableIntrospection)({
            isDisabled: (request) => {
                const isIntrospectionSecretPresent = request.headers.get("x-allow-introspection") ===
                    process.env.introspectionSecret;
                return isIntrospectionSecretPresent;
            },
        }),
    ],
});
exports.default = yoga;
//# sourceMappingURL=yoga.js.map