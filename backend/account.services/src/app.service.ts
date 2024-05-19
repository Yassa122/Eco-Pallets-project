import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
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
=======
import { ProfileService } from './profile/profile.service';
import { UserInfoService } from './user-info/user-info/user-info.service'; // Import UserInfoService
>>>>>>> e77d17d9dcf178cad4213d23c10cc322e58c1aba

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private identityService: IdentityService,
    private jwtService: JwtService,
<<<<<<< HEAD
    @Inject('ACCOUNT_SERVICE_KAFKA') private kafkaClient: ClientKafka, // Check this key
=======
    private profileService: ProfileService,
    private userInfoService: UserInfoService, // Add UserInfoService
    @Inject('ACCOUNT_SERVICE_KAFKA') private kafkaClient: ClientKafka,
>>>>>>> e77d17d9dcf178cad4213d23c10cc322e58c1aba
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async register(createIdentityDto: CreateIdentityDto): Promise<any> {
    return this.identityService.register(createIdentityDto);
  }

  async login(loginDto: LoginDto): Promise<any> {
    return this.identityService.login(loginDto);
  }

  public hello() {
    return 'Hello from API';
  }
<<<<<<< HEAD
  // async sendUserInfo(userId: string) {
  //   const userInfo = await this.getUser(userId);
  //   this.kafkaClient.emit('user-info-topic', {
  //     key: userId,
  //     value: JSON.stringify(userInfo),
  //   });
  // }
  // async getUser(userId: string): Promise<User | null> {
  //   return this.profileService.getUserProfileInfo(userId);
  // }
=======
  async sendUserInfo(userId: string) {
    const userInfo = await this.getUser(userId);
    this.kafkaClient.emit('user-info-topic', {
      key: userId,
      value: JSON.stringify(userInfo),
    });
  }

  async getUser(id: string): Promise<User | null> {
    return this.profileService.getUserProfileInfo(id);
  }
>>>>>>> e77d17d9dcf178cad4213d23c10cc322e58c1aba

  // async updateUser(
  //   userId: string,
  //   updateUserDto: UpdateUserProfileDto,
  // ): Promise<User | null> {
  //   return new Promise((resolve, reject) => {
  //     this.profileService
  //       .updateUserProfile(userId, updateUserDto)
  //       .then((user) => {
  //         resolve(user);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }
}
