//the app.service.ts is used to define the logic for implementing the method
//you will implement the methods here

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './identity/interfaces/user'; // Define this interface based on your schema
import * as bcrypt from 'bcrypt';
import { CreateIdentityDto } from './identity/dto/create.identity.dto';
import { IdentityService } from './identity/identity.service';
import { LoginDto } from './identity/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private identityService: IdentityService,
  ) {}

  async register(createIdentityDto: CreateIdentityDto): Promise<any> {
    return this.identityService.register(createIdentityDto);
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
}
