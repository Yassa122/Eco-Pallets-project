import { Strategy } from "passport-jwt";
import { IdentityService } from "../identity.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly identityService;
    constructor(identityService: IdentityService);
    validate(payload: any): Promise<any>;
}
export {};
