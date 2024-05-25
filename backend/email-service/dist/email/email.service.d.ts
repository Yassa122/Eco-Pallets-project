import { OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
export declare class EmailService implements OnModuleInit {
    private kafkaService;
    private consumer;
    private transporter;
    constructor(kafkaService: KafkaService);
    onModuleInit(): Promise<void>;
    processMessage(topic: string, partition: number, message: any): Promise<void>;
    sendWelcomeEmail(user: {
        name: string;
        email: string;
    }): Promise<void>;
    sendVerificationEmail(user: {
        name: string;
        email: string;
    }): Promise<void>;
    sendMail(to: string, subject: string, text: string): Promise<any>;
    sendResetMail(user: {
        email: string;
        resetUrl: string;
    }): Promise<void>;
}
