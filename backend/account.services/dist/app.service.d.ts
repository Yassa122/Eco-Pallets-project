/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { User } from './identity/interfaces/user';
export declare class AppService {
    private userModel;
    constructor(userModel: Model<User>);
    register(command: any): Promise<User>;
    login(command: any): Promise<{
        status: string;
        message: string;
    }>;
    hello(): string;
}
