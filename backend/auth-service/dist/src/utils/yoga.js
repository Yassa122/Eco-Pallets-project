"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const plugin_disable_introspection_1 = require("@graphql-yoga/plugin-disable-introspection");
const context_1 = require("../context");
const yoga = (0, graphql_yoga_1.createYoga)({
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