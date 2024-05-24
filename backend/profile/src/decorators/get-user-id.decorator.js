"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserId = void 0;
var common_1 = require("@nestjs/common");
exports.GetUserId = (0, common_1.createParamDecorator)(function (data, ctx) {
    var _a;
    var request = ctx.switchToHttp().getRequest();
    return (_a = request.user) === null || _a === void 0 ? void 0 : _a.id;
});
