// src/email/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async sendEmail(@Body() data: { to: string; subject: string; text: string }) {
    const { to, subject, text } = data;
    await this.emailService.sendMail(to, subject, text);
    return { message: 'Email sent successfully' };
  }

  @Post('welcome-email')
  async sendWelcomeEmail(@Body() user: { name: string; email: string }) {
    await this.emailService.sendWelcomeEmail(user);
    return { message: 'Welcome email sent successfully' };
  }

  @Post('verification-email')
  async sendVerificationEmail(@Body() user: { name: string; email: string }) {
    await this.emailService.sendVerificationEmail(user);
    return { message: 'Verification email sent successfully' };
  }

  @Post('reset-password-mail')
  async sendResetMail(@Body() data: { email: string; resetUrl: string }) {
    await this.emailService.sendResetMail(data);
    return { message: 'Reset password email sent successfully' };
  }
}
