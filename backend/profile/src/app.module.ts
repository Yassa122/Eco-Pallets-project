import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { OrderModule } from './order/order.module';
// import { databaseProviders } from './database/database.provider'; // Adjust path as necessary
import { UserInfoService } from './user-info/user-info.service';
import { UserInfoController } from './user-info/user-info.controller';
import { UserInfoModule } from './user-info/user-info.module';
import { ClientsModule, Transport } from '@nestjs/microservices';



@Module({
  imports: [
    UserInfoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

