import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { User } from './identity/interfaces/user';
import { CreateIdentityDto } from './identity/dto/create.identity.dto';
import {UpdateUserProfile} from './identity/dto/update-user-profile.dto';
import { IdentityService } from './identity/identity.service';
import { JwtService } from '@nestjs/jwt';

import { UserInfoService } from './user-info/user-info/user-info.service';
import { LoginDto } from './identity/dto/login.dto';
import { CreateGuestIdentityDto } from './identity/dto/guest.identity.dto';
import { UpdatePasswordDto } from './identity/dto/update-password.dto';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private identityService: IdentityService,
    private jwtService: JwtService,

    private userInfoService: UserInfoService,
    @Inject('ACCOUNT_SERVICE_KAFKA') private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async register(createIdentityDto: CreateIdentityDto): Promise<any> {
    return this.identityService.register(createIdentityDto);
  }

  async guestRegister(
    createGuestIdentityDto: CreateGuestIdentityDto,
  ): Promise<any> {
    return this.identityService.guestRegister(createGuestIdentityDto);
  }
  async requestPasswordReset(email: string): Promise<void> {
    return this.identityService.requestPasswordReset(email);
  }
  async login(loginDto: LoginDto): Promise<any> {
    return this.identityService.login(loginDto);
  }
  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
    return this.identityService.updatePassword(updatePasswordDto);
  }
  public hello() {
    return 'Hello from API';
  }

  async sendUserInfo(userId: string) {
    const userInfo = await this.getUser(userId);
    this.kafkaClient.emit('user-info-topic', {
      key: userId,
      value: JSON.stringify(userInfo),
    });
  }

  async getUser(id: string): Promise<User | null> {
    return this.userInfoService.getUserData(id);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserProfile,
  ): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.userInfoService
        .updateUserData(userId, updateUserDto)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async updateUserDataByEmail(
    email: string,
    updateUserDto: UpdateUserProfile,
  ): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.userInfoService
        .updateUserDataByEmail(email, updateUserDto)
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async createGuestUser(): Promise<any> {
    try {
      return this.identityService.createGuestUser();
    } catch (error) {
      this.logger.error('Failed to create guest user', error.stack);
      throw new Error('Failed to create guest user');
    }
  }
}
