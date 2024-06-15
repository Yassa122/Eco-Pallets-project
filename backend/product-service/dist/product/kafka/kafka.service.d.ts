import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Consumer } from 'kafkajs';
export declare class KafkaService implements OnModuleInit, OnModuleDestroy {
    private readonly kafkaClient;
    private readonly producer;
    private readonly consumers;
    private readonly logger;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    sendMessage(topic: string, message: any): Promise<void>;
    getConsumer(groupId: string): Consumer;
    subscribeToTopic(consumer: Consumer, topic: string): Promise<void>;
    runConsumer(consumer: Consumer, callback: (topic: string, partition: number, message: any) => void): Promise<void>;
}
