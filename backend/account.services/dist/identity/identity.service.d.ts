/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { User } from './interfaces/user';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class IdentityService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    hello(message: any): any;
    register(createIdentityDto: CreateIdentityDto): Promise<User>;
    validateUser(loginDto: LoginDto): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
        phoneNumber?: string;
        company?: string;
        address?: string;
        isEmailVerified?: boolean;
        passwordResetToken?: string;
        passwordResetExpires?: Date;
        id: any;
    }>;
    getUserbyUsername(username: string): Promise<{
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
        phoneNumber?: string;
        company?: string;
        address?: string;
        isEmailVerified?: boolean;
        passwordResetToken?: string;
        passwordResetExpires?: Date;
        id: any;
    }>;
    login(user: any): Promise<{
        access_token: string;
        expires_in: any;
    }>;
}
