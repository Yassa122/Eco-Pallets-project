import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "../Jwt.strategy";
import { AuthService } from "../services/auth.service";
import { PrismaModule } from "./prisma.module";
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
// src/auth/auth.module.ts
@Module({
  imports: [
    PrismaModule, // Ensures PrismaService is available
    JwtModule, // Configure JWT Module as required
    PassportModule, // Passport configuration
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // Export AuthService for use in UserModule and other modules
})
export class AuthModule {}
