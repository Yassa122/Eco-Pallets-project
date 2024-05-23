export declare class EmailService {
    private transporter;
    constructor();
    sendWelcomeEmail(user: {
        name: string;
        email: string;
    }): Promise<void>;
    sendVerificationEmail(user: {
        name: string;
        email: string;
    }): Promise<string>;
    sendMail(to: string, subject: string, text: string): Promise<any>;
    sendResetMail(user: {
        email: string;
    }): Promise<string>;
}
