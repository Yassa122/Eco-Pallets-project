"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const kafka_service_1 = require("../kafka/kafka.service");
const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
let EmailService = class EmailService {
    constructor(kafkaService) {
        this.kafkaService = kafkaService;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'Plasticpallets-software@outlook.com',
                pass: 'Plastic.pallets',
            },
        });
        const handlebarOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.resolve('./src/email/partials/'),
                layoutsDir: path.resolve('./src/email/layouts/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./src/email/views/'),
            extName: '.handlebars',
        };
        this.transporter.use('compile', hbs(handlebarOptions));
    }
    async onModuleInit() {
        this.consumer = this.kafkaService.getConsumer('email-service-group');
        await this.kafkaService.subscribeToTopic(this.consumer, 'password-reset-request');
        this.kafkaService.runConsumer(this.consumer, this.processMessage.bind(this));
    }
    async processMessage(topic, partition, message) {
        const value = JSON.parse(message.value.toString());
        const { email, resetToken } = value;
        console.log(`Received Kafka message:`, value);
        console.log(`Extracted email: ${email}, resetToken: ${resetToken}`);
        const resetUrl = `http://localhost:3000/pages/authentication/reset?token=${resetToken}`;
        console.log(`Generated reset URL: ${resetUrl}`);
        await this.sendResetMail({ email, resetUrl });
    }
    async sendWelcomeEmail(user) {
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
        }
        catch (error) {
            console.error(`Nodemailer error sending email to ${user.email}`, error);
        }
    }
    async sendVerificationEmail(user) {
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
        }
        catch (error) {
            console.error(`Nodemailer error sending email to ${user.email}`, error);
        }
    }
    async sendMail(to, subject, text) {
        const mailOptions = {
            from: 'plasticpallets-software@outlook.com',
            to,
            subject,
            text,
        };
        return this.transporter.sendMail(mailOptions);
    }
    async sendResetMail(user) {
        try {
            console.log(`Sending reset email to: ${user.email} with URL: ${user.resetUrl}`);
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
        }
        catch (error) {
            console.error(`Nodemailer error sending email to ${user.email}`, error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [kafka_service_1.KafkaService])
], EmailService);
//# sourceMappingURL=email.service.js.map