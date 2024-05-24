import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  public async sendEmail(reqBody: any) {
    return 'Email sent';
  }
  public async sendWelcomeEmail(reqBody: any) {
    return 'Welcome email sent';
  }
  public async sendVerificationEmail(reqBody: any) {
    return 'Verification email sent';
  }
}
