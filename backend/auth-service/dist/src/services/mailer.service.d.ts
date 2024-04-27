import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
export declare class MailerService {
    private readonly mailerService;
    constructor(mailerService: NestMailerService);
    sendVerificationEmail(email: string, token: string): Promise<void>;
}
