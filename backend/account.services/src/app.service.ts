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
    private jwtService: JwtService,
  ) {}

  async register(createIdentityDto: CreateIdentityDto): Promise<any> {
    return this.identityService.register(createIdentityDto);
  }
  async login(LoginDto: LoginDto): Promise<any> {
    return this.identityService.login(LoginDto);
  }

  public hello() {
    return 'Hello from API';
  }
}
