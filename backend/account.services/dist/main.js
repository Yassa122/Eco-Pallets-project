"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const kafka_module_1 = require("./kafka/kafka/kafka.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(8000, () => console.log('HTTP server is running on http://localhost:8000'));
    const kafkaApp = await core_1.NestFactory.createMicroservice(kafka_module_1.KafkaModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: '2',
            },
        },
    });
    kafkaApp.listen();
    console.log('Kafka microservice is listening');
}
bootstrap();
//# sourceMappingURL=main.js.map