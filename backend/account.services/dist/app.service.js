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
const bcrypt = require("bcrypt");
const identity_service_1 = require("./identity/identity.service");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
const event_emitter_1 = require("@nestjs/event-emitter");
let AppService = class AppService {
    constructor(userModel, identityService, jwtService, client) {
        this.userModel = userModel;
        this.identityService = identityService;
        this.jwtService = jwtService;
        this.client = client;
        this.client.subscribeToResponseOf('get_user_info');
    }
    async register(createIdentityDto) {
        return this.identityService.register(createIdentityDto);
    }
    async login(loginDto) {
        const user = await this.userModel.findOne({ username: loginDto.username });
        if (user && (await bcrypt.compare(loginDto.password, user.password))) {
            const payload = {
                id: user._id,
                name: user.firstName + ' ' + user.lastName,
                username: user.username,
            };
            const accessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET || 'your_secret_key',
                expiresIn: '1h',
            });
            return {
                status: 'success',
                message: 'User logged in successfully',
                access_token: accessToken,
                user: {
                    id: user._id,
                    username: user.username,
                    name: user.firstName + ' ' + user.lastName,
                },
            };
        }
        return { status: 'failure', message: 'Invalid credentials' };
    }
    hello() {
        return 'Hello from API';
    }
    async handleUserInfo(data) {
        const user = await this.userModel.findById(data.userId).exec();
        if (!user) {
            throw new Error('User not found');
        }
        return {
            id: user._id,
            name: user.firstName + ' ' + user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber
        };
    }
};
exports.AppService = AppService;
__decorate([
    (0, event_emitter_1.OnEvent)('get_user_info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "handleUserInfo", null);
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(3, (0, common_1.Inject)('USER_SERVICE')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        identity_service_1.IdentityService,
        jwt_1.JwtService,
        microservices_1.ClientKafka])
], AppService);
//# sourceMappingURL=app.service.js.map