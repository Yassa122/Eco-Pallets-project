import { PrismaService } from "./prisma.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Only PrismaService should be here
})
export class PrismaModule {}
 