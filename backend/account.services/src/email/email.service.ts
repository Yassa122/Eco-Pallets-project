// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, // false for TLS, true for SSL
      auth: {
        user: 'plasticpallets-software@outlook.com',
        pass: 'Plasticpallets!1'
      }
    });
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
}
