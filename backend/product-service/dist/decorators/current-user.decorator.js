"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        throw new Error('Authorization header is missing');
    }
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);
    if (typeof decodedToken === 'object' && decodedToken) {
        return decodedToken.id;
    }
    else {
        throw new Error('Invalid token');
    }
});
//# sourceMappingURL=current-user.decorator.js.map