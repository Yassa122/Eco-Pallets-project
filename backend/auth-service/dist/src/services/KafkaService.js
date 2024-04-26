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
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let KafkaService = class KafkaService {
    constructor() {
        this.kafka = new kafkajs_1.Kafka({
            clientId: "my-app",
            brokers: ["localhost:9092"],
        });
        this.producer = this.kafka.producer();
        this.connect();
    }
    async connect() {
        await this.producer.connect();
    }
    async publish(topic, messages) {
        await this.producer.send({
            topic,
            messages: messages.map((message) => ({ value: JSON.stringify(message) })),
        });
    }
    async onModuleDestroy() {
        await this.producer.disconnect();
    }
};
exports.KafkaService = KafkaService;
exports.KafkaService = KafkaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KafkaService);
//# sourceMappingURL=KafkaService.js.map