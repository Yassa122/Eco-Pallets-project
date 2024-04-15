import { Module } from "@nestjs/common";
import { PrismaService } from "../src/services/prismaService";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
