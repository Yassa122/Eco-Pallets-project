"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const userAlreadyExists_exception_1 = require("./exceptions/userAlreadyExists.exception");
let IdentityService = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var IdentityService = _classThis = class {
        constructor(userModel, // Make sure 'User' matches the name given in forFeature
        jwtService) {
            this.userModel = userModel;
            this.jwtService = jwtService;
        }
        hello(message) {
            return message;
        }
        register(createIdentityDto) {
            return __awaiter(this, void 0, void 0, function* () {
                // Check if the username or email already exists
                const existingUser = yield this.userModel
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
                // Hash the password using bcrypt with a salt round of 10
                const hashedPassword = yield bcrypt.hash(createIdentityDto.password, 10);
                // Create a new user with all provided details
                const newUser = new this.userModel({
                    firstName: createIdentityDto.firstName,
                    lastName: createIdentityDto.lastName,
                    email: createIdentityDto.email,
                    username: createIdentityDto.username,
                    password: hashedPassword,
                    phoneNumber: createIdentityDto.phoneNumber,
                    company: createIdentityDto.company,
                    address: createIdentityDto.address,
                    isEmailVerified: false, // Default to false until verified
                    passwordResetToken: createIdentityDto.passwordResetToken,
                    passwordResetExpires: createIdentityDto.passwordResetExpires,
                });
                const savedUser = yield newUser.save();
                return savedUser;
            });
        }
        validateUser(loginDto) {
            return __awaiter(this, void 0, void 0, function* () {
                let loginResult = yield this.userModel.findOne({
                    username: loginDto.username,
                    password: loginDto.password,
                });
                let jsonData = loginResult.toObject();
                let { __v, _id } = jsonData, userData = __rest(jsonData, ["__v", "_id"]);
                return Object.assign({ id: jsonData._id }, userData);
            });
        }
        getUserbyUsername(username) {
            return __awaiter(this, void 0, void 0, function* () {
                let loginResult = yield this.userModel.findOne({
                    username: username,
                });
                if (loginResult === null) {
                    return null;
                }
                let jsonData = loginResult.toObject();
                let { __v, _id } = jsonData, userData = __rest(jsonData, ["__v", "_id"]);
                return Object.assign({ id: jsonData._id }, userData);
            });
        }
        login(user) {
            return __awaiter(this, void 0, void 0, function* () {
                //console.log(command)
                let payload = {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                };
                var token = this.jwtService.sign(payload);
                var tokenvalue = this.jwtService.decode(token);
                //for refresh token
                // var date= new Date(tokenvalue.exp*1000);
                // var refreshTokenDate = new Date(
                //     date.setDate(date.getDate()+1)
                // );
                // const tokenData:TokenDto={
                //     token: token,
                //     expiresIn:tokenvalue.exp,
                //     refreshTokenexpiresIn: refreshTokenDate,
                //     expired:false
                // }
                return {
                    access_token: this.jwtService.sign(payload),
                    expires_in: tokenvalue.exp,
                };
                //let jsonData =loginResult.toObject();
                //let {__v, _id, ...userData}=jsonData;
                //return {
                //id:jsonData._id,
                //...userData
                //}
            });
        }
    };
    __setFunctionName(_classThis, "IdentityService");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IdentityService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IdentityService = _classThis;
})();
exports.IdentityService = IdentityService;
