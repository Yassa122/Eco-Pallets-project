import { AppService } from './app.service';
import { EmailService } from './email/email.service';
export declare class AppController {
    private readonly appService;
    private readonly emailService;
    constructor(appService: AppService, emailService: EmailService);
    getHello(): string;
    sendEmail(data: {
        to: string;
        subject: string;
        text: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    }>;
    sendWelcomeEmail(user: {
        name: string;
        email: string;
    }): Promise<{
        message: string;
        error?: undefined;
    } | {
        error: string;
        message?: undefined;
    }>;
}
