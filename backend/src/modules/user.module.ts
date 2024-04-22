// src/user/user.module.ts
import { Module } from "@nestjs/common";
import { UserResolver } from "../resolvers/mutations/resolvers/user.resolver";
import { AuthModule } from "./auth.module"; // Import AuthModule here
import { UserService } from "services/user.service";
@Module({
  imports: [AuthModule], // Import AuthModule here
  providers: [UserResolver, UserService],
})
export class UserModule {}
