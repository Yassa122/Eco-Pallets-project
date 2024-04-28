import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './identity/interfaces/user'; // Define this interface based on your schema
import * as bcrypt from 'bcrypt';
@Injectable()
export class AppService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async register(command: any): Promise<User> {
    // Hash the password using bcrypt with a salt round of 10
    const hashedPassword = await bcrypt.hash(command.password, 10);

    // Create a new user instance with all required fields from the schema
    const newUser = new this.userModel({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      username: command.username,
      password: hashedPassword, // Store the hashed password
      phoneNumber: command.phoneNumber,
      company: command.company,
      address: command.address,
      // Additional fields can be added here if needed
    });

    // Save the new user to the database
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
