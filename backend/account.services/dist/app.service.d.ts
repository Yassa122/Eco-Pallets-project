/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { User } from './identity/interfaces/user';
import { CreateIdentityDto } from './identity/dto/create.identity.dto';
import { IdentityService } from './identity/identity.service';
import { LoginDto } from './identity/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserDto } from './get-user.dto';
export declare class AppService {
    private userModel;
    private identityService;
    private jwtService;
    private clientKafka;
    constructor(userModel: Model<User>, identityService: IdentityService, jwtService: JwtService, clientKafka: ClientKafka);
    register(createIdentityDto: CreateIdentityDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    hello(): string;
    getUserData(id: string): Promise<User | null>;
    updateUserData(id: string, userData: GetUserDto): Promise<User>;
}
