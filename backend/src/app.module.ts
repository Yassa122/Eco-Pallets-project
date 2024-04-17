import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./Jwt.strategy";
import { AuthService } from "./services/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "../prisma/prisma.moudle"; // Corrected typo from 'prisma.moudle' to 'prisma.module'
import { PrismaService } from "services/PrismaService"; // This path might need correction depending on your folder structure

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
        secret: configService.get<string>("JWT_KEY"), // Ensure your .env has JWT_KEY
        signOptions: { expiresIn: "3600s" }, // Token expires in 1 hour
      }), 
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AppModule {}
