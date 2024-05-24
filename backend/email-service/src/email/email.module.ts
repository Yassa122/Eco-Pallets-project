// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Module({
  controllers: [EmailController],
  providers: [EmailService, KafkaService],
})
export class EmailModule {}
