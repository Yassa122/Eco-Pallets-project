import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
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
=======
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { databaseProviders } from './database/database.provider'; // Adjust path as necessary
import { UserInfoService } from './user-info/user-info.service';
import { UserInfoController } from './user-info/user-info.controller';
import { UserInfoModule } from './user-info/user-info.module';
import { KafkaService } from './kafka/kafka.service';
import { KafkaModule } from './kafka/kafka.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallet2'),
    OrderModule,
    UserInfoModule,
    KafkaModule,
  ],
  controllers: [AppController, UserInfoController],
  providers: [
    AppService,
    ...databaseProviders,
    UserInfoService,
    UserInfoModule, // Make sure UserInfoModule is included
    KafkaService,
  ],
  exports: [...databaseProviders],
>>>>>>> main
})
export class AppModule {}

