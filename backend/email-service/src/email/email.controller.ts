// src/email/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() data: { to: string, subject: string, text: string }) {
    const { to, subject, text } = data;
    await this.emailService.sendMail(to, subject, text);
    return { message: 'Email sent successfully' };
  }
  @Post('welcome-email')
  async sendWelcomeEmail(@Body() user: { name: string, email: string }) {
    await this.emailService.sendWelcomeEmail(user);
  }
  @Post('verification-email')
  async sendVerificationEmail(@Body() user: { name: string, email: string }) {
    await this.emailService.sendVerificationEmail(user);
  }
  @Post('reset-password-mail')
  async sendResetMail(@Body() user: {email: string }) {
    await this.emailService.sendResetMail(user);
  }
}