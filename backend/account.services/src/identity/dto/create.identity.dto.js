"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIdentityDto = void 0;
const class_validator_1 = require("class-validator");
let CreateIdentityDto = (() => {
    var _a;
    let _firstName_decorators;
    let _firstName_initializers = [];
    let _firstName_extraInitializers = [];
    let _lastName_decorators;
    let _lastName_initializers = [];
    let _lastName_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _username_decorators;
    let _username_initializers = [];
    let _username_extraInitializers = [];
    let _password_decorators;
    let _password_initializers = [];
    let _password_extraInitializers = [];
    let _phoneNumber_decorators;
    let _phoneNumber_initializers = [];
    let _phoneNumber_extraInitializers = [];
    let _company_decorators;
    let _company_initializers = [];
    let _company_extraInitializers = [];
    let _address_decorators;
    let _address_initializers = [];
    let _address_extraInitializers = [];
    let _isEmailVerified_decorators;
    let _isEmailVerified_initializers = [];
    let _isEmailVerified_extraInitializers = [];
    let _passwordResetToken_decorators;
    let _passwordResetToken_initializers = [];
    let _passwordResetToken_extraInitializers = [];
    let _passwordResetExpires_decorators;
    let _passwordResetExpires_initializers = [];
    let _passwordResetExpires_extraInitializers = [];
    return _a = class CreateIdentityDto {
            constructor() {
                this.firstName = __runInitializers(this, _firstName_initializers, void 0);
                this.lastName = (__runInitializers(this, _firstName_extraInitializers), __runInitializers(this, _lastName_initializers, void 0));
                this.email = (__runInitializers(this, _lastName_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.username = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _username_initializers, void 0));
                this.password = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.phoneNumber = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _phoneNumber_initializers, void 0));
                this.company = (__runInitializers(this, _phoneNumber_extraInitializers), __runInitializers(this, _company_initializers, void 0));
                this.address = (__runInitializers(this, _company_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.isEmailVerified = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _isEmailVerified_initializers, void 0));
                this.passwordResetToken = (__runInitializers(this, _isEmailVerified_extraInitializers), __runInitializers(this, _passwordResetToken_initializers, void 0));
                this.passwordResetExpires = (__runInitializers(this, _passwordResetToken_extraInitializers), __runInitializers(this, _passwordResetExpires_initializers, void 0));
                __runInitializers(this, _passwordResetExpires_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _firstName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _lastName_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _email_decorators = [(0, class_validator_1.IsEmail)(), (0, class_validator_1.IsNotEmpty)()];
            _username_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(3)];
            _password_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.MinLength)(6)];
            _phoneNumber_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _company_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _address_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _isEmailVerified_decorators = [(0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsOptional)()];
            _passwordResetToken_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _passwordResetExpires_decorators = [(0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: obj => "firstName" in obj, get: obj => obj.firstName, set: (obj, value) => { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _firstName_extraInitializers);
            __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: obj => "lastName" in obj, get: obj => obj.lastName, set: (obj, value) => { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _lastName_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: obj => "username" in obj, get: obj => obj.username, set: (obj, value) => { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: obj => "password" in obj, get: obj => obj.password, set: (obj, value) => { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _phoneNumber_decorators, { kind: "field", name: "phoneNumber", static: false, private: false, access: { has: obj => "phoneNumber" in obj, get: obj => obj.phoneNumber, set: (obj, value) => { obj.phoneNumber = value; } }, metadata: _metadata }, _phoneNumber_initializers, _phoneNumber_extraInitializers);
            __esDecorate(null, null, _company_decorators, { kind: "field", name: "company", static: false, private: false, access: { has: obj => "company" in obj, get: obj => obj.company, set: (obj, value) => { obj.company = value; } }, metadata: _metadata }, _company_initializers, _company_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: obj => "address" in obj, get: obj => obj.address, set: (obj, value) => { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _isEmailVerified_decorators, { kind: "field", name: "isEmailVerified", static: false, private: false, access: { has: obj => "isEmailVerified" in obj, get: obj => obj.isEmailVerified, set: (obj, value) => { obj.isEmailVerified = value; } }, metadata: _metadata }, _isEmailVerified_initializers, _isEmailVerified_extraInitializers);
            __esDecorate(null, null, _passwordResetToken_decorators, { kind: "field", name: "passwordResetToken", static: false, private: false, access: { has: obj => "passwordResetToken" in obj, get: obj => obj.passwordResetToken, set: (obj, value) => { obj.passwordResetToken = value; } }, metadata: _metadata }, _passwordResetToken_initializers, _passwordResetToken_extraInitializers);
            __esDecorate(null, null, _passwordResetExpires_decorators, { kind: "field", name: "passwordResetExpires", static: false, private: false, access: { has: obj => "passwordResetExpires" in obj, get: obj => obj.passwordResetExpires, set: (obj, value) => { obj.passwordResetExpires = value; } }, metadata: _metadata }, _passwordResetExpires_initializers, _passwordResetExpires_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.CreateIdentityDto = CreateIdentityDto;
