import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './interfaces/user';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from './exceptions/userAlreadyExists.exception';
import { KafkaService } from '../kafka/kafka.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateGuestIdentityDto } from './dto/guest.identity.dto';

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

    // Send message to Kafka to create a cart for the new user
    await this.kafkaService.sendMessage('user-registered', {
      userId: user._id.toString(),
    });

    return user;
  }

  async guestRegister(
    createGuestIdentityDto: CreateGuestIdentityDto,
  ): Promise<User> {
    this.logger.debug('Attempting to register a GUEST user');

    if (
      await this.userExists(
        createGuestIdentityDto.username,
        createGuestIdentityDto.email,
      )
    ) {
      this.logger.warn(
        `Registration failed: User already exists with username ${createGuestIdentityDto.username} or email ${createGuestIdentityDto.email}`,
      );
      throw new UserAlreadyExistsException();
    }
    console.log(createGuestIdentityDto._id);
    const hashedPassword = await bcrypt.hash(
      createGuestIdentityDto.password,
      10,
    );
    const user = await this.createUserFromGuest(
      createGuestIdentityDto,
      hashedPassword,
    );
    this.logger.debug(`User ${user._id} registered successfully`);

    // now we dont create a cart as it is already made when he started as a guest
    // // Send message to Kafka to create a cart for the new user
    // await this.kafkaService.sendMessage('user-registered', {
    //   userId: user._id.toString(),
    // });

    return user.save();
  }

  private async userExists(username: string, email: string): Promise<boolean> {
    const user = await this.userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .exec();
    return !!user;
  }

  private async createUserFromGuest(
    dto: CreateGuestIdentityDto,
    hashedPassword: string,
  ): Promise<User> {
    const newUser = new this.userModel({
      ...dto,
      password: hashedPassword,
      isEmailVerified: false,
    });
    return newUser.save();
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

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<boolean> {
    const { token, newPassword } = updatePasswordDto;

    let decodedToken;
    try {
      decodedToken = this.jwtService.verify(token, {
        secret:
          process.env.JWT_SECRET || 'secretKey_YoucANWritewhateveryoulikey',
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }

    const user = await this.userModel.findById(decodedToken.id).exec();
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedNewPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      },
    );

    this.logger.debug(`Password updated successfully for user ID ${user._id}`);
    return true;
  }

  // Method to create a guest user token
  async createGuestUser(): Promise<any> {
    try {
      const uniqueGuestId = new mongoose.Types.ObjectId();
      const payload = { role: 'guest', id: uniqueGuestId };
      this.logger.log('Creating JWT for guest user with payload:', payload);
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'default_secret',
        expiresIn: '1h',
      });
      this.logger.log('JWT created successfully:', accessToken);
      await this.kafkaService.sendMessage('user-registered', {
        userId: uniqueGuestId.toString(),
      });

      return { accessToken };
    } catch (error) {
      this.logger.error('Failed to create guest user', error.stack);
      throw new Error('Failed to create guest user');
    }
  }
  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.warn(
        `Password reset request failed: No user found with email ${email}`,
      );
      throw new NotFoundException('User not found');
    }

    const resetToken = this.jwtService.sign(
      { id: user._id },
      {
        secret:
          process.env.JWT_SECRET || 'secretKey_YoucANWritewhateveryoulikey',
        expiresIn: '1h', // Token expiration time
      },
    );

    user.passwordResetToken = resetToken;
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour from now
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/pages/authentication/reset?token=${resetToken}`;
    console.log(`Generated reset URL: ${resetUrl}`); // Log the reset URL

    await this.kafkaService.sendMessage('password-reset-request', {
      userId: user._id.toString(),
      email: user.email,
      resetToken, // Send the token in the Kafka message
    });

    this.logger.debug(
      `Password reset token generated and message sent to Kafka for ${user.email}`,
    );
  }
}
