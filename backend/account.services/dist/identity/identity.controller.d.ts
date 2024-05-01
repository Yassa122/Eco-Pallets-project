import { IdentityService } from './identity.service';
export declare class IdentityController {
    private identityService;
    constructor(identityService: IdentityService);
    hello(req: any): any;
    register(command: any): Promise<import("./interfaces/user").User>;
    login(command: any): Promise<any>;
    me(command: any): Promise<any>;
}
