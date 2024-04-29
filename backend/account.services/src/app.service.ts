//the app.service.ts is used to define the logic for implementing the method 
//you will implement the methods here 

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './identity/interfaces/user'; // Define this interface based on your schema
import * as bcrypt from 'bcrypt';
import { CreateIdentityDto } from './identity/dto/create.identity.dto';
import { IdentityService } from './identity/identity.service';
import { EmailService } from './email/email.service';
@Injectable()
export class AppService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private identityService: IdentityService,
  ) {}

  async register(createIdentityDto: CreateIdentityDto): Promise<any> {
    return this.identityService.register(createIdentityDto);
  }
  public async login(command: any) {
    // Implement login logic, typically finding a user and verifying the password
    const user = await this.userModel.findOne({ username: command.username });
    if (user && user.password === command.password) {
      // Hash comparison in real scenario
      return { status: 'success', message: 'User logged in' };
    }
    return { status: 'failure', message: 'Invalid credentials' };
  }

  public hello() {
    return 'Hello from API';
  }
  public async sendEmail(reqBody: any) {
    return 'Email sent';
  }

}
