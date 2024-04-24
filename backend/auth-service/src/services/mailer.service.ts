// mailer.service.ts
import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
import { join } from "path";
@Injectable()
export class MailerService {
  constructor(private readonly mailerService: NestMailerService) {}

  async sendVerificationEmail(email: string, token: string) {
    const url = `http://example.com/verify?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: "Verify Your Email Address",
      template: __dirname + "../templates/verification", // Adjusted path
      context: {
        url,
      },
    });
  }
}
