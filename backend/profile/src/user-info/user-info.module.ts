import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';

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
            groupId: '2',
            heartbeatInterval: 3000,  // Heartbeat interval in milliseconds
            sessionTimeout: 30000, 
          }
        },
      },
    ]),
  ],
  controllers: [UserInfoController],
  providers: [UserInfoService],
  exports: [UserInfoService]
})
export class UserInfoModule {}
