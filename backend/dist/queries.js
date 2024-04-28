"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const queries = (0, nexus_1.queryType)({
    definition(t) {
        t.field("hello", {
            type: "String",
            resolve: () => "world",
        });
    },
});
exports.default = queries;
//# sourceMappingURL=queries.js.map