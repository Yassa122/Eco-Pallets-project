import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from './exceptions/userAlreadyExists.exception';
import { UserSchema } from './users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class IdentityService {
  constructor(
    @InjectModel('User') private userModel: Model<User>, // Make sure 'User' matches the name given in forFeature
    private jwtService: JwtService,
  ) {}

  hello(message) {
    return message;
  }

  async register(createIdentityDto: CreateIdentityDto): Promise<User> {
    // Check if the username or email already exists
    const existingUser = await this.userModel
      .findOne({
        $or: [
          { username: createIdentityDto.username },
          { email: createIdentityDto.email },
        ],
      })
      .exec();
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }

    // Hash the password using bcrypt with a salt round of 10
    const hashedPassword = await bcrypt.hash(createIdentityDto.password, 10);

    // Create a new user with all provided details
    const newUser = new this.userModel({
      firstName: createIdentityDto.firstName,
      lastName: createIdentityDto.lastName,
      email: createIdentityDto.email,
      username: createIdentityDto.username,
      password: hashedPassword,
      phoneNumber: createIdentityDto.phoneNumber,
      company: createIdentityDto.company,
      address: createIdentityDto.address,
      isEmailVerified: false, // Default to false until verified
      passwordResetToken: createIdentityDto.passwordResetToken,
      passwordResetExpires: createIdentityDto.passwordResetExpires,
    });

    const savedUser = await newUser.save();

    return savedUser;
  }

  async validateUser(loginDto: LoginDto): Promise<any> {
    // Fetch user by username
    let user = await this.userModel.findOne({ username: loginDto.username });

    // Log the found user for debugging
    console.log('Fetched user:', user);

    // Check if user exists
    if (!user) {
      console.log('No user found with this username:', loginDto.username);
      return null;
    }

    // Check if the password matches
    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    console.log('Password matches:', passwordMatches);

    if (passwordMatches) {
      let userData = user.toObject();
      let { __v, _id, password, ...userDetails } = userData;

      // Return user details without sensitive data
      return {
        id: userData._id,
        ...userDetails,
      };
    }

    // Return null if password doesn't match
    return null;
  }

  async getUserbyUsername(username: string) {
    let loginResult = await this.userModel.findOne({
      username: username,
    });

    if (loginResult === null) {
      return null;
    }
    let jsonData = loginResult.toObject();
    let { __v, _id, ...userData } = jsonData;

    return {
      id: jsonData._id,
      ...userData,
    };
  }
  async login(loginDto: LoginDto): Promise<any> {
    // Fetch user by username
    const user = await this.userModel.findOne({ username: loginDto.username });

    // Check if user exists and password is correct
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      const payload = {
        id: user._id,
        name: user.firstName + ' ' + user.lastName, // assuming you want to use full name
        username: user.username,
      };

      // Generate JWT token

      // Return token and user details
      return {
        status: 'success',
        message: 'User logged in successfully',

        user: {
          id: user._id,
          username: user.username,
          name: user.firstName + ' ' + user.lastName,
        },
      };
    }

    // Return null if login credentials are invalid
    return { status: 'failure', message: 'Invalid credentials' };
  }
}
