// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ProfileModule],  // Import ProfileModule here
  controllers: [AppController], // Only AppController should be here if it's for general app use
  providers: [AppService], // Only AppService should be here if it's for general app use
})
export class AppModule {}
