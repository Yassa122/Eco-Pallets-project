/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { User } from './identity/interfaces/user';
import { CreateIdentityDto } from './identity/dto/create.identity.dto';
import { IdentityService } from './identity/identity.service';
import { LoginDto } from './identity/dto/login.dto';
export declare class AppService {
    private userModel;
    private identityService;
    constructor(userModel: Model<User>, identityService: IdentityService);
    register(createIdentityDto: CreateIdentityDto): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        status: string;
        message: string;
        user: any;
    } | {
        status: string;
        message: string;
        user?: undefined;
    }>;
    hello(): string;
}
