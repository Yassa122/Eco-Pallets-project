import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';
export declare class AppController {
    private accountServices;
    private readonly client;
    constructor(accountServices: AppService, client: ClientKafka);
    getHello(): any;
    register(reqBody: any): Promise<any>;
    login(reqBody: any): Promise<any>;
    handleOrderCreated(data: any): void;
    onModuleInit(): void;
}
