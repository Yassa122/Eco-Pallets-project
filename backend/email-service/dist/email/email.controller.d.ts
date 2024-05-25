import { EmailService } from './email.service';
export declare class EmailController {
    private readonly emailService;
    constructor(emailService: EmailService);
    sendEmail(data: {
        to: string;
        subject: string;
        text: string;
    }): Promise<{
        message: string;
    }>;
    sendWelcomeEmail(user: {
        name: string;
        email: string;
    }): Promise<{
        message: string;
    }>;
    sendVerificationEmail(user: {
        name: string;
        email: string;
    }): Promise<{
        message: string;
    }>;
    sendResetMail(data: {
        email: string;
        resetUrl: string;
    }): Promise<{
        message: string;
    }>;
}
