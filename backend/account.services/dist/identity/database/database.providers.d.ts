/// <reference types="mongoose/types/pipelinestage" />
import * as mongoose from 'mongoose';
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<typeof mongoose>;
}[];
