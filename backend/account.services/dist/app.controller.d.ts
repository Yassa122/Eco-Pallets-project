import { AppService } from './app.service';
export declare class AppController {
    private accountServices;
    constructor(accountServices: AppService);
    getHello(): any;
    register(reqBody: any): Promise<any>;
    login(reqBody: any): Promise<{
        status: string;
        message: string;
    }>;
    //oh no
}
