"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const identity_controller_1 = require("./identity.controller");
const identity_service_1 = require("./identity.service");
const database_providers_1 = require("./database/database.providers");
const identity_providers_1 = require("./database/identity.providers");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const local_strategy_1 = require("./strategies/local.strategy");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const exists_strategy_1 = require("./strategies/exists.strategy");
const users_module_1 = require("./users/users.module");
let IdentityModule = class IdentityModule {
};
exports.IdentityModule = IdentityModule;
exports.IdentityModule = IdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'secretKey_YoucANWritewhateveryoulike',
                signOptions: { expiresIn: '10000s' },
            }),
            users_module_1.UsersModule,
        ],
        controllers: [identity_controller_1.IdentityController],
        providers: [
            identity_service_1.IdentityService,
            ...identity_providers_1.identityProviders,
            ...database_providers_1.databaseProviders,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            exists_strategy_1.ExistsStrategy,
        ],
        exports: [...database_providers_1.databaseProviders],
    })
], IdentityModule);
//# sourceMappingURL=identity.module.js.map