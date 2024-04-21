import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./Jwt.strategy";
import { AuthService } from "./services/auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "./modules/prisma.module"; // Assumed correct path
import { PrismaService } from "./services/prisma.service"; // Corrected the import path
import { UserModule } from "./modules/user.module"; // Assumed correct path
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { AppResolver } from "resolvers/mutations/resolvers/queries/app.resolver";
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"), // specifies where to generate and save the schema file
      sortSchema: true, // Optional: sorts the schema lexicographically
      playground: true, // Optional: enables GraphQL Playground
      context: ({ req, res }) => ({ req, res }), // Pass the request and response objects to the GraphQL context
    }),

    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"], // Make sure this points to the correct path where your .env file is located
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>("JWT_SECRET");
        console.log("JWT Secret:", jwtSecret); // This should log the JWT secret value
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: "3600s" },
        };
      },
      inject: [ConfigService],
    }),
    UserModule, // Assuming UserModule manages user-specific operations
  ],
  providers: [AuthService, JwtStrategy, PrismaService, AppResolver],
  exports: [AuthService],
})
export class AppModule {}
