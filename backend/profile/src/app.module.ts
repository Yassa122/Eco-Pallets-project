import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [ProfileModule],
  controllers: [AppController],
  providers: [AppService, ProfileService],
})
export class AppModule {}
