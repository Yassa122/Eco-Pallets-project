//the app.service.ts is used to define the logic for implementing the method
//you will implement the methods here

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './identity/interfaces/user'; // Define this interface based on your schema
import * as bcrypt from 'bcrypt';
import { CreateIdentityDto } from './identity/dto/create.identity.dto';
import { IdentityService } from './identity/identity.service';
import { LoginDto } from './identity/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequestEvent } from './user-info.event';
import { GetUserDto } from './user-info/dto/get-user.dto';
import { OnEvent } from '@nestjs/event-emitter';


@Injectable()
export class AppService {
  
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private identityService: IdentityService,
    private jwtService:JwtService,
    @Inject('USER_SERVICE') private clientKafka: ClientKafka
  ) {  
    }
  

    async register(createIdentityDto: CreateIdentityDto): Promise<any> {
      const createdUser = await this.identityService.register(createIdentityDto);
      this.clientKafka.emit('user_data', createdUser); // Assuming 'user_data' is your Kafka topic
      return createdUser;
  }
  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userModel.findOne({ username: loginDto.username });
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload = {
        id: user._id,
        name: user.firstName + ' ' + user.lastName, // assuming you want to use full name
        username: user.username,
      };

      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'your_secret_key', // Use an environment variable or a fallback secret
        expiresIn: '1h', // Token validity time
      });

      return {
        status: 'success',
        message: 'User logged in successfully',
        access_token: accessToken,
        user: {
          id: user._id,
          username: user.username,
          name: user.firstName + ' ' + user.lastName,
        },
      };
    }

    return { status: 'failure', message: 'Invalid credentials' };
  }

  public hello() {
    return 'Hello from API';
  }

  // handleUserInfo(getInfoEvent:GetUserRequestEvent){
  //   this.client.send('get_user',new GetUserRequestDto(getInfoEvent.userId)).subscribe((user)=>{
  //     console.log(`user with ID ${user.userId}...`,);
  //   });
  // }

  // @OnEvent('get_user_info')
  // async handleUserInfo(data: { userId: string }): Promise<any> {
  //   const user = await this.userModel.findById(data.userId).exec() as User;

  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   // Process and return the user details
  //   return {
  //     id: user._id,
  //     name: user.firstName + ' ' + user.lastName,
  //     email:user.email,
  //     phoneNumber:user.phoneNumber
  //   };
  // }
  // async getUserData(id: string): Promise<User | null> {
  //   return this.userModel.findById(id).exec();
  // }

  // async updateUserData(id: string, userData: GetUserDto): Promise<User> {
  //   return this.userModel.findByIdAndUpdate(id, userData, { new: true }).exec();
  // }

  
}
