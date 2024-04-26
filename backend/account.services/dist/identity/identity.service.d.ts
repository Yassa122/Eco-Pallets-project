/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { Identity } from './interfaces/identity';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class IdentityService {
    private identityModel;
    private jwtService;
    constructor(identityModel: Model<Identity>, jwtService: JwtService);
    hello(message: any): any;
    register(CreateIdentityDto: CreateIdentityDto): Promise<Identity & {
        _id: any;
    }>;
    validateUser(loginDto: LoginDto): Promise<{
        name: String;
        username: String;
        password: String;
        id: any;
    }>;
    getUserbyUsername(username: string): Promise<{
        name: String;
        username: String;
        password: String;
        id: any;
    }>;
    login(user: any): Promise<{
        access_token: string;
        expires_in: any;
    }>;
}
