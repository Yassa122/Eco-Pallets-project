<<<<<<< HEAD
//the app.service.ts is used to define the logic for implementing the method
//you will implement the methods here

import { Inject, Injectable } from '@nestjs/common';
=======
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
>>>>>>> main
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { User } from './identity/interfaces/user';
import { CreateIdentityDto } from './identity/dto/create.identity.dto';
import { UpdateUserProfileDto } from './identity/dto/updateUserProfile.dto';
import { IdentityService } from './identity/identity.service';
import { LoginDto } from './identity/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
<<<<<<< HEAD
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
=======
import { ProfileService } from './profile/profile.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private identityService: IdentityService,
    private jwtService: JwtService,
    private profileService: ProfileService,
    @Inject('ACCOUNT_SERVICE_KAFKA') private kafkaClient: ClientKafka, // Check this key
  ) {}

  async onModuleInit() {
    // Subscribe to any necessary response topics
    await this.kafkaClient.connect();
  }
  async register(createIdentityDto: CreateIdentityDto): Promise<any> {
    return this.identityService.register(createIdentityDto);
>>>>>>> main
  }

  async login(loginDto: LoginDto): Promise<any> {
    return this.identityService.login(loginDto);
  }

  public hello() {
    return 'Hello from API';
  }
<<<<<<< HEAD

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

  
=======
  async sendUserInfo(userId: string) {
    const userInfo = await this.getUser(userId);
    this.kafkaClient.emit('user-info-topic', {
      key: userId,
      value: JSON.stringify(userInfo),
    });
  }
  async getUser(userId: string): Promise<User | null> {
    return this.profileService.getUserProfileInfo(userId);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserProfileDto,
  ): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.profileService
        .updateUserProfile(userId, updateUserDto)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
>>>>>>> main
}
