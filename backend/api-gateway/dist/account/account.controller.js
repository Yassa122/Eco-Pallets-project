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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_service_1 = require("./account.service");
const microservices_1 = require("@nestjs/microservices");
let AccountController = class AccountController {
    constructor(accountServices, accountClient) {
        this.accountServices = accountServices;
        this.accountClient = accountClient;
    }
    getHello() {
        return this.accountServices.hello();
    }
    async regster(req) {
        return this.accountServices.register({ body: req.body.data });
    }
    async login(req) {
        return this.accountServices.login({ body: req.body.data });
    }
    onModuleInit() {
        this.accountClient.subscribeToResponseOf('hellofromapi');
        this.accountClient.subscribeToResponseOf('register');
        this.accountClient.subscribeToResponseOf('login');
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Get)('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AccountController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "regster", null);
__decorate([
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "login", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('account'),
    __param(1, (0, common_1.Inject)('ACC_SERVICE')),
    __metadata("design:paramtypes", [account_service_1.AccountService,
        microservices_1.ClientKafka])
], AccountController);
//# sourceMappingURL=account.controller.js.map