import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./Jwt.strategy";
import { AuthService } from "./services/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "./auth/modules/prisma.module"; // Assumed correct path
import { PrismaService } from "./services/prisma.service"; // Corrected the import path
import { UserModule } from "./auth/modules/user.module"; // Assumed correct path

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"), // Ensure your .env has JWT_SECRET
        signOptions: { expiresIn: "3600s" }, // Token expires in 1 hour
      }),
      inject: [ConfigService],
    }),
    UserModule, // Assuming UserModule manages user-specific operations
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AppModule {}
