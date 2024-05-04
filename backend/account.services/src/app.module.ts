import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './identity/users/users.module';
import { IdentityService } from './identity/identity.service';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ClientsModule.register([
      {
        name:'USER_SERVICE',
        transport:Transport.KAFKA,
        options:{
          client:{
            clientId:'user',
            brokers:['localhost:9092']
          },
          consumer:{
            groupId:'1',
          }
        }
      }
    ]),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets'),
    IdentityModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, IdentityService, JwtService],
  exports: [ClientsModule],
})
export class AppModule {}
