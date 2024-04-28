/// <reference types="mongoose/types/pipelinestage" />
import { Model } from 'mongoose';
import { Identity } from '../src/identity/interfaces/identity';
export declare class AppService {
    private userModel;
    constructor(userModel: Model<Identity>);
    register(command: any): Promise<Identity & {
        _id: any;
    }>;
    login(command: any): Promise<{
        status: string;
        message: string;
    }>;
    hello(): string;
}
