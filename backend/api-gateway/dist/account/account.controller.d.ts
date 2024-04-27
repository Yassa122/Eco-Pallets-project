import { OnModuleInit } from '@nestjs/common';
import { AccountService } from './account.service';
import { ClientKafka } from '@nestjs/microservices';
export declare class AccountController implements OnModuleInit {
    private accountServices;
    private readonly accountClient;
    constructor(accountServices: AccountService, accountClient: ClientKafka);
    getHello(): any;
    regster(req: any): Promise<import("rxjs").Subscription>;
    login(req: any): Promise<import("rxjs").Subscription>;
    onModuleInit(): void;
}
