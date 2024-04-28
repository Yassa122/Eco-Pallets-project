import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Identity } from '../src/identity/interfaces/identity'; // Define this interface based on your schema

@Injectable()
export class AppService {
  constructor(@InjectModel('User') private userModel: Model<Identity>) {}

  public async register(command: any) {
    const newUser = new this.userModel({
      name: command.name,
      username: command.username,
      password: command.password, // Consider hashing the password before storing
    });
    return newUser.save();
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
}
