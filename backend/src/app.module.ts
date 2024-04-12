import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "KAFKA_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ["localhost:9092"],
          },
          consumer: {
            groupId: "my-consumer-group",
          },
        },
      },
    ]),
    // other modules
  ],
})
export class AppModule {}
