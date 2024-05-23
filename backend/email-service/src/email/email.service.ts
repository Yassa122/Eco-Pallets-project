import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import * as hbs from 'nodemailer-express-handlebars';
@Injectable()// <-- Add parentheses here
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // false for TLS, true for SSL
      auth: {
        user: 'Plasticpallets-software@outlook.com',
        pass: 'Plastic.pallets'
      }
    });
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve('./src/email/'),
        defaultLayout: false,
      },
      viewPath: path.resolve('./src/email/views/'), // Corrected path
    };
    
    this.transporter.use('compile', hbs(handlebarOptions));
  }
  
  async sendWelcomeEmail(user: { name: string, email: string }) {
    try {
      const mailOptions = {
        from: 'plasticpallets-software@outlook.com',
        template: 'reset',
        to: user.email,
        subject: `Welcome to Plastic pallets, ${user.name}`,
        context: {
          name: user.name,
          company: 'Plastic Pallets Software',
        },
      };
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(`Nodemailer error sending email to ${user.email}`, error);
    }
  }
  async sendVerificationEmail(user: { name: string, email: string }) {
    try {
      const mailOptions = {
        from: 'plasticpallets-software@outlook.com',
        template: 'emailVerification',
        to: user.email,
        subject: `Verify your email, ${user.name}`,
        context: {
          name: user.name,
          company: 'Plastic Pallets Software',
        },
      };
      await this.transporter.sendMail(mailOptions);
      return ("mail sent successfully");
    } catch (error) {
      console.log(`Nodemailer error sending email to ${user.email}`, error);
    }
  }
  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'plasticpallets-software@outlook.com',
      to,
      subject,
      text
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendResetMail(user: { email: string }){
    try {
      const mailOptions = {
        from: 'plasticpallets-software@outlook.com',
        template: 'reset',
        to: user.email,
        subject: `Reset your password`,
        context: {
          company: 'Plastic Pallets Software',
        },
      };
      await this.transporter.sendMail(mailOptions);
      return ("mail sent successfully");
    } catch (error) {
      console.log(`Nodemailer error sending email to ${user.email}`, error);
    }
  }
}
