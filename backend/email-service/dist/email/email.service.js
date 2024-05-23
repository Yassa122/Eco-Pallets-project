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
const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
let EmailService = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
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
            viewPath: path.resolve('./src/email/views/'),
        };
        this.transporter.use('compile', hbs(handlebarOptions));
    }
    async sendWelcomeEmail(user) {
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
        }
        catch (error) {
            console.log(`Nodemailer error sending email to ${user.email}`, error);
        }
    }
    async sendVerificationEmail(user) {
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
        }
        catch (error) {
            console.log(`Nodemailer error sending email to ${user.email}`, error);
        }
    }
    async sendMail(to, subject, text) {
        const mailOptions = {
            from: 'plasticpallets-software@outlook.com',
            to,
            subject,
            text
        };
        return this.transporter.sendMail(mailOptions);
    }
    async sendResetMail(user) {
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
        }
        catch (error) {
            console.log(`Nodemailer error sending email to ${user.email}`, error);
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map