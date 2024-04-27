"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
class UserAlreadyExistsException extends microservices_1.RpcException {
    constructor() {
        super({
            status: common_1.HttpStatus.BAD_REQUEST,
            error: 'User already exists'
        });
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
//# sourceMappingURL=userAlreadyExists.exception.js.map