// src/email/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() data: { to: string, subject: string, text: string }) {
    const { to, subject, text } = data;
    await this.emailService.sendMail(to, subject, text);
    return { message: 'Email sent successfully' };
  }
}
