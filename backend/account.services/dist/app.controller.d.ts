import { AppService } from './app.service';
import { GetUserDto } from './get-user.dto';
export declare class AppController {
    private accountServices;
    constructor(accountServices: AppService);
    getHello(): any;
    register(reqBody: any): Promise<any>;
    login(reqBody: any): Promise<any>;
    getUser(id: string): Promise<import("./identity/interfaces/user").User>;
    updateUser(id: string, userData: GetUserDto): Promise<import("./identity/interfaces/user").User>;
}
