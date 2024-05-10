import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from './exceptions/userAlreadyExists.exception';
import { KafkaService } from '../kafka/kafka.service';
import { UpdateUserProfileDto } from './dto/updateUserProfile.dto';
@Injectable()
export class IdentityService {
  private readonly logger = new Logger(IdentityService.name);
  hello: any;

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
    private kafkaService: KafkaService,
  ) {}

  async register(createIdentityDto: CreateIdentityDto): Promise<User> {
    this.logger.debug('Attempting to register a new user');

    if (
      await this.userExists(createIdentityDto.username, createIdentityDto.email)
    ) {
      this.logger.warn(
        `Registration failed: User already exists with username ${createIdentityDto.username} or email ${createIdentityDto.email}`,
      );
      throw new UserAlreadyExistsException();
    }

    const hashedPassword = await bcrypt.hash(createIdentityDto.password, 10);
    const user = await this.createUser(createIdentityDto, hashedPassword);
    this.logger.debug(`User ${user._id} registered successfully`);
    return user;
  }

  private async userExists(username: string, email: string): Promise<boolean> {
    const user = await this.userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .exec();
    return !!user;
  }

  private async createUser(
    dto: CreateIdentityDto,
    hashedPassword: string,
  ): Promise<User> {
    const newUser = new this.userModel({
      ...dto,
      password: hashedPassword,
      isEmailVerified: false,
    });
    return newUser.save();
  }

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.userModel.findOne({ username: loginDto.username });
    if (!user) {
      this.logger.warn(
        `Login failed: No user found with username ${loginDto.username}`,
      );
      return null;
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password.toString(),
      user.password,
    );
    if (!passwordMatches) {
      this.logger.warn(
        `Login failed: Incorrect password for username ${loginDto.username}`,
      );
      return null;
    }

    this.logger.debug(`User ${user._id} authenticated successfully`);
    return this.stripSensitiveDetails(user.toObject());
  }

  private stripSensitiveDetails(user: any): any {
    const { password, __v, ...userDetails } = user;
    return { id: user._id, ...userDetails };
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

  async login(
    loginDto: LoginDto,
  ): Promise<{ success: boolean; accessToken?: string }> {
    const user = await this.validateUser(loginDto);
    if (!user) {
      return { success: false };
    }

    // Prepare the payload
    const payload = {
      id: user.id, // Unique identifier for the user
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber, // Optional field
      company: user.company, // Optional field
      shippingAddresses: user.shippingAddresses,
      isEmailVerified: user.isEmailVerified, // Default is false, optional
      passwordResetToken: user.passwordResetToken, // Optional for password resets
      passwordResetExpires: user.passwordResetExpires, // Optional for password resets
    };

    // Sign the JWT with the payload that now includes extended user data
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'secretKey_YoucANWritewhateveryoulikey',
      expiresIn: '1h', // Token expiration time
    });

    // Optional: Send user details to other services via Kafka
    await this.kafkaService.sendMessage('user-logged-in', {
      userId: user.id.toString(),
      userDetails: this.prepareUserData(user),
      token: accessToken,
    });

    return { success: true, accessToken };
  }

  // Ensure that the prepareUserData method does not strip out data you now want to include in the JWT
  private prepareUserData(user: any): any {
    // Directly destructuring without converting to Mongoose document
    const {
      password,
      passwordResetToken,
      passwordResetExpires,
      __v,
      ...safeData
    } = user;
    return safeData;
  }
}
