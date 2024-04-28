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

  async validateUser(loginDto: LoginDto) {
    let loginResult = await this.userModel.findOne({
      username: loginDto.username,
      password: loginDto.password,
    });

    let jsonData = loginResult.toObject();
    let { __v, _id, ...userData } = jsonData;

    return {
      id: jsonData._id,
      ...userData,
    };
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
  async login(user: any) {
    //console.log(command)
    let payload = {
      id: user._id,
      name: user.name,
      username: user.username,
    };

    var token = this.jwtService.sign(payload);
    var tokenvalue: any = this.jwtService.decode(token);
    //for refresh token
    // var date= new Date(tokenvalue.exp*1000);
    // var refreshTokenDate = new Date(
    //     date.setDate(date.getDate()+1)
    // );

    // const tokenData:TokenDto={
    //     token: token,
    //     expiresIn:tokenvalue.exp,
    //     refreshTokenexpiresIn: refreshTokenDate,
    //     expired:false
    // }

    return {
      access_token: this.jwtService.sign(payload),
      expires_in: tokenvalue.exp,
    };
    //let jsonData =loginResult.toObject();
    //let {__v, _id, ...userData}=jsonData;

    //return {
    //id:jsonData._id,
    //...userData
    //}
  }
}
