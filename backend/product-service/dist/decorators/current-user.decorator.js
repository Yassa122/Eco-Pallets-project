"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const cookies = request.headers.cookie;
    if (!cookies) {
        throw new common_1.UnauthorizedException('Cookies are missing');
    }
    const cookieObject = Object.fromEntries(cookies.split('; ').map((c) => c.split('=')));
    let token = cookieObject['auth_token'];
    if (!token) {
        token = cookieObject['accessToken'];
    }
    if (!token) {
        throw new common_1.UnauthorizedException('Token verification failed:  Token not found');
    }
    try {
        const decodedToken = jwt.decode(token);
        if (typeof decodedToken === 'object' && decodedToken && decodedToken.id) {
            return decodedToken.id;
        }
        else {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    catch (err) {
        throw new common_1.UnauthorizedException('Token verification failed: ' + err.message);
    }
});
//# sourceMappingURL=current-user.decorator.js.map