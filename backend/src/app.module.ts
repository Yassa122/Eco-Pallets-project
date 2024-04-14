import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PrismaService } from "./services/PrismaService";
import { KafkaService } from "./services/KafkaService";
import { SignupService } from "./services/SignupService";
@Module({
  providers: [PrismaService, SignupService, KafkaService],
})
export class AppModule {}
