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
    this.logger.debug(`Attempting login for username ${loginDto.username}`);
    const user = await this.validateUser(loginDto);
    if (!user) {
      return { success: false };
    }

    const payload = {
      id: user.id, // Using MongoDB '_id' as the subject of the token
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'secretKey_YoucANWritewhateveryoulike',
      expiresIn: '1h',
    });

    this.logger.debug(`JWT issued for user ID ${user.id}`);
    return { success: true, accessToken };
  }
}
