"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const UserRoleEnum = (0, nexus_1.enumType)({
    name: "UserRole",
    members: ["USER", "user", "ADMIN", "MANAGER", "GUEST"],
});
exports.default = UserRoleEnum;
//# sourceMappingURL=user-role.js.map