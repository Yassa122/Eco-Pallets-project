import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
export declare class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
    private kafkaClient;
    private consumer;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
