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
exports.IdentityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const userAlreadyExists_exception_1 = require("./exceptions/userAlreadyExists.exception");
const mongoose_2 = require("@nestjs/mongoose");
let IdentityService = class IdentityService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    hello(message) {
        return message;
    }
    async register(createIdentityDto) {
        const existingUser = await this.userModel
            .findOne({
            $or: [
                { username: createIdentityDto.username },
                { email: createIdentityDto.email },
            ],
        })
            .exec();
        if (existingUser) {
            throw new userAlreadyExists_exception_1.UserAlreadyExistsException();
        }
        const hashedPassword = await bcrypt.hash(createIdentityDto.password, 10);
        const newUser = new this.userModel({
            firstName: createIdentityDto.firstName,
            lastName: createIdentityDto.lastName,
            email: createIdentityDto.email,
            username: createIdentityDto.username,
            password: hashedPassword,
            phoneNumber: createIdentityDto.phoneNumber,
            company: createIdentityDto.company,
            address: createIdentityDto.address,
            isEmailVerified: false,
            passwordResetToken: createIdentityDto.passwordResetToken,
            passwordResetExpires: createIdentityDto.passwordResetExpires,
        });
        const savedUser = await newUser.save();
        return savedUser;
    }
    async validateUser(loginDto) {
        let loginResult = await this.userModel.findOne({
            username: loginDto.username,
            password: loginDto.password,
        });
        let jsonData = loginResult.toObject();
        let { __v, _id, ...userData } = jsonData;
        return {
            id: jsonData._id,
            ...userData,
        };
    }
    async getUserbyUsername(username) {
        let loginResult = await this.userModel.findOne({
            username: username,
        });
        if (loginResult === null) {
            return null;
        }
        let jsonData = loginResult.toObject();
        let { __v, _id, ...userData } = jsonData;
        return {
            id: jsonData._id,
            ...userData,
        };
    }
    async login(user) {
        let payload = {
            id: user._id,
            name: user.name,
            username: user.username,
        };
        var token = this.jwtService.sign(payload);
        var tokenvalue = this.jwtService.decode(token);
        return {
            access_token: this.jwtService.sign(payload),
            expires_in: tokenvalue.exp,
        };
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], IdentityService);
//# sourceMappingURL=identity.service.js.map