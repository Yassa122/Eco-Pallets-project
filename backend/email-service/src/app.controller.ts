import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService, // Ensure EmailService is injected
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('send-email')
  async sendEmail(@Body() data: { to: string, subject: string, text: string }) {
    try {
      const { to, subject, text } = data;
      await this.emailService.sendMail(to, subject, text);
      return { message: 'Email sent successfully' };
    } catch (error) {
      return { error: 'Failed to send email' };
    }
  }
  @Post('send-welcome-email')
  async sendWelcomeEmail(@Body() user: { name: string, email: string }) {
    try {
      await this.emailService.sendWelcomeEmail(user);
      return { message: 'Welcome email sent successfully' };
    } catch (error) {
      return { error: 'Failed to send welcome email' };
    }
  }


}
