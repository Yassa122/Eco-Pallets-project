import { Strategy } from "passport-local";
import { IdentityService } from "../identity.service";
declare const ExistsStrategy_base: new (...args: any[]) => Strategy;
export declare class ExistsStrategy extends ExistsStrategy_base {
    private readonly identityService;
    constructor(identityService: IdentityService);
    validate(username: string, password: string): Promise<any>;
}
export {};
