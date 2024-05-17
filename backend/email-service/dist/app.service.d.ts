export declare class AppService {
    getHello(): string;
    sendEmail(reqBody: any): Promise<string>;
    sendWelcomeEmail(reqBody: any): Promise<string>;
    sendVerificationEmail(reqBody: any): Promise<string>;
}
