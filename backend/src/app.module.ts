import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PrismaService } from "./services/PrismaService";
import { KafkaService } from "./services/KafkaService";
@Module({
  providers: [PrismaService, KafkaService],
})
export class AppModule {}
