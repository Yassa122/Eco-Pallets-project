"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const Jwt_strategy_1 = require("./Jwt.strategy");
const auth_service_1 = require("./services/auth.service");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./modules/prisma.module");
const prisma_service_1 = require("./services/prisma.service");
const user_module_1 = require("./modules/user.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const app_resolver_1 = require("./resolvers/mutations/resolvers/queries/app.resolver");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), "src/schema.gql"),
                sortSchema: true,
                playground: true,
                context: ({ req, res }) => ({ req, res }),
            }),
            prisma_module_1.PrismaModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: [".env"],
            }),
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    const jwtSecret = configService.get("JWT_SECRET");
                    console.log("JWT Secret:", jwtSecret);
                    return {
                        secret: jwtSecret,
                        signOptions: { expiresIn: "3600s" },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
        ],
        providers: [auth_service_1.AuthService, Jwt_strategy_1.JwtStrategy, prisma_service_1.PrismaService, app_resolver_1.AppResolver],
        exports: [auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map