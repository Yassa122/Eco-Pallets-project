/// <reference types="mongoose/types/pipelinestage" />
import { Connection } from 'mongoose';
export declare const identityProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<unknown, {}, {}, {}>;
    inject: string[];
}[];
