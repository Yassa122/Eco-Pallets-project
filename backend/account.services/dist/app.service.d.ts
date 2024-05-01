/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { User } from './identity/interfaces/user';
import { CreateIdentityDto } from './identity/dto/create.identity.dto';
import { IdentityService } from './identity/identity.service';
export declare class AppService {
    private userModel;
    private identityService;
    constructor(userModel: Model<User>, identityService: IdentityService);
    register(createIdentityDto: CreateIdentityDto): Promise<any>;
    login(command: any): Promise<{
        status: string;
        message: string;
    }>;
    hello(): string;
    sendEmail(reqBody: any): Promise<string>;
}
