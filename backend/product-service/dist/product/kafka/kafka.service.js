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
var KafkaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
let KafkaService = KafkaService_1 = class KafkaService {
    constructor() {
        this.consumers = [];
        this.logger = new common_1.Logger(KafkaService_1.name);
        this.kafkaClient = new kafkajs_1.Kafka({
            clientId: 'product-service',
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        });
        this.producer = this.kafkaClient.producer();
    }
    async onModuleInit() {
        await this.producer.connect();
    }
    async onModuleDestroy() {
        await this.producer.disconnect();
        for (const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
    async sendMessage(topic, message) {
        this.logger.log(`Sending message to topic: ${topic}, message: ${JSON.stringify(message)}`);
        await this.producer.send({
            topic,
            messages: [
                {
                    key: message.userId?.toString() || '',
                    value: JSON.stringify(message),
                },
            ],
        });
    }
    getConsumer(groupId) {
        const consumer = this.kafkaClient.consumer({ groupId });
        this.consumers.push(consumer);
        return consumer;
    }
    async subscribeToTopic(consumer, topic) {
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });
    }
    async runConsumer(consumer, callback) {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                this.logger.log(`Received message from topic: ${topic}`);
                callback(topic, partition, message);
            },
        });
    }
};
exports.KafkaService = KafkaService;
exports.KafkaService = KafkaService = KafkaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], KafkaService);
//# sourceMappingURL=kafka.service.js.map