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

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private identityService: IdentityService,
    private jwtService: JwtService,
    @Inject('ACCOUNT_SERVICE_KAFKA') private kafkaClient: ClientKafka, // Check this key
  ) {}

  async onModuleInit() {
    // Subscribe to any necessary response topics
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
  async sendUserInfo(userId: string) {
    const userInfo = await this.getUser(userId);
    this.kafkaClient.emit('user-info-topic', {
      key: userId,
      value: JSON.stringify(userInfo),
    });
  }
  async getUser(userId: string): Promise<User | null> {
    return this.identityService.getUserProfileInfo(userId);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserProfileDto,
  ): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.kafkaClient
        .send('update.user.info', { userId, updateUserDto })
        .subscribe({
          next: (user) => resolve(user),
          error: (err) => reject('Failed to update user info: ' + err),
        });
    });
  }
}
