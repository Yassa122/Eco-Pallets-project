// src/user/user.module.ts
import { Module } from "@nestjs/common";
import { UserResolver } from "../../resolvers/mutations/user.resolver";
import { AuthModule } from "../../auth/modules/auth.module"; // Import AuthModule here
@Module({
  imports: [AuthModule], // Import AuthModule here
  providers: [UserResolver],
})
export class UserModule {}
