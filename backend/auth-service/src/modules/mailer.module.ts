// mailer.module.ts
import { Module } from "@nestjs/common";
import { MailerModule as NestMailerModule } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { MailerService } from "../services/mailer.service";
import { join } from "path";

@Module({
  imports: [
    NestMailerModule.forRoot({
      transport: {
        host: "yassa.ashraf56@gmail.com",
        service: "gmail",

        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "yassa.ashraf56@gmail.com",
          pass: "bnmb lhha jdvd jdhi",
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, "templates"),
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
 