import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './dto/get-user-request.dto';

@Injectable()
export class AppService {
  // private readonly users: any[] =[
  //   {
  //     userId:'123',
  //     stripeUserId:'34567'
  //   },
  //   {
  //     userId:'13',
  //     stripeUserId:'3567'
  //   },
  //   ];
  getHello(): string {
    return 'Hello World!';
  }

  // getUser(getUserRequest:GetUserRequest){
  //   return this.users.find((user)=>user.userId===getUserRequest.userId);
  // }
  
}



