"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const identity_service_1 = require("./identity/identity.service");
let AppService = class AppService {
    constructor(userModel, identityService) {
        this.userModel = userModel;
        this.identityService = identityService;
    }
    async register(createIdentityDto) {
        return this.identityService.register(createIdentityDto);
    }
    async login(command) {
        const user = await this.userModel.findOne({ username: command.username });
        if (user && user.password === command.password) {
            return { status: 'success', message: 'User logged in' };
        }
        return { status: 'failure', message: 'Invalid credentials' };
    }
    hello() {
        return 'Hello from API';
    }
    async sendEmail(reqBody) {
        return 'Email sent';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        identity_service_1.IdentityService])
], AppService);
//# sourceMappingURL=app.service.js.map