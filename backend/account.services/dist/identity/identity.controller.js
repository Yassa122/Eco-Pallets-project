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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityController = void 0;
const common_1 = require("@nestjs/common");
const identity_service_1 = require("./identity.service");
const microservices_1 = require("@nestjs/microservices");
const local_auth_guard_1 = require("./strategies/local-auth.guard");
const jwt_auth_guard_1 = require("./strategies/jwt-auth.guard");
let IdentityController = class IdentityController {
    constructor(identityService) {
        this.identityService = identityService;
    }
    hello(req) {
        console.log(req);
        return this.identityService.hello(req.data);
    }
    async register(command) {
        console.log(command);
        return this.identityService.register(command.data);
    }
    async login(command) {
        console.log('command user: ', command.user);
        return this.identityService.login(command.user);
    }
    async me(command) {
        const { id, ...rest } = command.user;
        return rest;
    }
};
exports.IdentityController = IdentityController;
__decorate([
    (0, microservices_1.MessagePattern)('hellofromapi'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IdentityController.prototype, "hello", null);
__decorate([
    (0, microservices_1.MessagePattern)('register'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, microservices_1.MessagePattern)('login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, microservices_1.MessagePattern)('me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "me", null);
exports.IdentityController = IdentityController = __decorate([
    (0, common_1.Controller)('identity'),
    __metadata("design:paramtypes", [identity_service_1.IdentityService])
], IdentityController);
//# sourceMappingURL=identity.controller.js.map