import { ClientKafka } from '@nestjs/microservices';
export declare class AccountService {
    private readonly accountClient;
    constructor(accountClient: ClientKafka);
    hello(): import("rxjs").Subscription;
    register(command: any): import("rxjs").Subscription;
    login(command: any): import("rxjs").Subscription;
}
