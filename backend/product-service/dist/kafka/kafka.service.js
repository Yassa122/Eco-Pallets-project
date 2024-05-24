"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumerService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let KafkaConsumerService = class KafkaConsumerService {
    constructor() {
        this.kafkaClient = new kafkajs_1.Kafka({
            clientId: 'product-service',
            brokers: ['localhost:9092'],
        });
        this.consumer = this.kafkaClient.consumer({
            groupId: 'product-service-group',
        });
    }
    async onModuleInit() {
        await this.consumer.connect();
        await this.consumer.subscribe({
            topic: 'user-login-events',
            fromBeginning: true,
        });
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const user = JSON.parse(message.value.toString());
                console.log(`User logged in: ${user.userId}`);
                console.log(`Received message: ${message.value.toString()}`);
            },
        });
    }
    async onModuleDestroy() {
        await this.consumer.disconnect();
    }
};
exports.KafkaConsumerService = KafkaConsumerService;
exports.KafkaConsumerService = KafkaConsumerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KafkaConsumerService);
//# sourceMappingURL=kafka.service.js.map