"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const cookies = request.headers.cookie;
    const authHeader = request.headers.authorization;
    let token;
    if (cookies) {
        const cookieObject = Object.fromEntries(cookies.split('; ').map((c) => c.split('=')));
        token = cookieObject['auth_token'] || cookieObject['accessToken'];
    }
    if (!token && authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        throw new common_1.UnauthorizedException('Token verification failed: Token not found');
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