import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { KafkaService } from './kafka/kafka.service';
@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [AppService , EmailService,KafkaService],
})
export class AppModule {}
