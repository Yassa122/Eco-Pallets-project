import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer } from 'kafkajs';
export declare class KafkaService implements OnModuleInit, OnModuleDestroy {
    private kafka;
    private producer;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    sendMessage(topic: string, message: any): Promise<void>;
    getConsumer(groupId: string): Consumer;
    subscribeToTopic(consumer: Consumer, topic: string): Promise<Consumer>;
    runConsumer(consumer: Consumer, callback: Function): Promise<void>;
}
