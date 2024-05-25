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
            clientId: 'app-client',
            brokers: ['localhost:9092'],
        });
        this.producer = this.kafka.producer();
    }
    async onModuleInit() {
        await this.producer.connect();
    }
    async onModuleDestroy() {
        await this.producer.disconnect();
    }
    async sendMessage(topic, message) {
        console.log('Sending message:', message);
        await this.producer.send({
            topic: topic,
            messages: [
                { key: message.userId ? message.userId.toString() : null, value: JSON.stringify(message) },
            ],
        });
    }
    getConsumer(groupId) {
        return this.kafka.consumer({ groupId });
    }
    async subscribeToTopic(consumer, topic) {
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });
        return consumer;
    }
    async runConsumer(consumer, callback) {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                callback(topic, partition, message);
            },
        });
    }
};
exports.KafkaService = KafkaService;
exports.KafkaService = KafkaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KafkaService);
//# sourceMappingURL=kafka.service.js.map