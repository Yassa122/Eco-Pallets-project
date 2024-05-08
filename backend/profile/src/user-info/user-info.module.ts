import { Module } from '@nestjs/common';
// import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { AppModule } from '../app.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ACCOUNT_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'account',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: '2'
          }
        },
      },
    ]),
  ],
    controllers: [UserInfoController],
    providers: [UserInfoService],
    exports: [UserInfoService]  // Export UserInfoService if it needs to be used elsewhere
  })
  export class UserInfoModule {}
  
