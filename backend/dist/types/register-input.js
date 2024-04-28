"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const user = (0, nexus_1.objectType)({
    name: "user",
    definition(t) {
        t.id("id");
        t.string("email");
        t.string("password");
        t.field("role", { type: user });
    },
});
exports.default = user;
//# sourceMappingURL=register-input.js.map