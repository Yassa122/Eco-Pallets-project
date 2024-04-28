import { OnModuleDestroy } from "@nestjs/common";
export declare class KafkaService implements OnModuleDestroy {
    private readonly kafka;
    private readonly producer;
    constructor();
    private connect;
    publish(topic: string, messages: any[]): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
