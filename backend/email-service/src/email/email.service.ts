import { Injectable, OnModuleInit } from '@nestjs/common';
import { KafkaService } from '../kafka/kafka.service';
import { Consumer } from 'kafkajs';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as hbs from 'nodemailer-express-handlebars';

@Injectable()
export class EmailService implements OnModuleInit {
  private consumer: Consumer;
  private transporter: nodemailer.Transporter;

  constructor(private kafkaService: KafkaService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'Plasticpallets-software@outlook.com',
        pass: 'Plastic.pallets',
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extName: '.handlebars', // Specify extension .handlebars
        partialsDir: path.resolve('./src/email/partials/'), // Path to partials
        layoutsDir: path.resolve('./src/email/layouts/'), // Path to layouts
        defaultLayout: false, // No default layout
      },
      viewPath: path.resolve('./src/email/views/'), // Path to views
      extName: '.handlebars',
    };

    this.transporter.use('compile', hbs(handlebarOptions));
  }

  async onModuleInit() {
    this.consumer = this.kafkaService.getConsumer('email-service-group');
    await this.kafkaService.subscribeToTopic(
      this.consumer,
      'password-reset-request',
    );
    this.kafkaService.runConsumer(
      this.consumer,
      this.processMessage.bind(this),
    );
  }

  async processMessage(topic: string, partition: number, message: any) {
    const value = JSON.parse(message.value.toString());
    const { email, resetToken } = value;
  
    console.log(`Received Kafka message:`, value); // Log the received message
    console.log(`Extracted email: ${email}, resetToken: ${resetToken}`); // Log extracted values
  
    const resetUrl = `http://localhost:3000/pages/authentication/reset?token=${resetToken}`;
    console.log(`Generated reset URL: ${resetUrl}`); // Log the reset URL for debugging
  
    await this.sendResetMail({ email, resetUrl });
  }
  
  async sendWelcomeEmail(user: { name: string; email: string }) {
    try {
      const mailOptions = {
        from: 'plasticpallets-software@outlook.com',
        to: user.email,
        subject: `Welcome to Plastic Pallets, ${user.name}`,
        template: 'welcome',
        context: {
          name: user.name,
          company: 'Plastic Pallets Software',
        },
      };
      await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error(`Nodemailer error sending email to ${user.email}`, error);
    }
  }

  async sendVerificationEmail(user: { name: string; email: string }) {
    try {
      const mailOptions = {
        from: 'plasticpallets-software@outlook.com',
        to: user.email,
        subject: `Verify your email, ${user.name}`,
        template: 'emailVerification',
        context: {
          name: user.name,
          company: 'Plastic Pallets Software',
        },
      };
      await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error(`Nodemailer error sending email to ${user.email}`, error);
    }
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'plasticpallets-software@outlook.com',
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendResetMail(user: { email: string; resetUrl: string }) {
    try {
      console.log(
        `Sending reset email to: ${user.email} with URL: ${user.resetUrl}`,
      ); // Log for debugging
      const mailOptions = {
        from: 'plasticpallets-software@outlook.com',
        to: user.email,
        subject: 'Reset your password',
        template: 'reset',
        context: {
          resetUrl: user.resetUrl,
          company: 'Plastic Pallets Software',
        },
      };
      await this.transporter.sendMail(mailOptions);
      console.log('Reset email sent successfully');
    } catch (error) {
      console.error(`Nodemailer error sending email to ${user.email}`, error);
    }
  }
}
