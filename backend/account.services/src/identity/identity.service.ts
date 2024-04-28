import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Identity } from './interfaces/identity';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import * as bcrypt from 'bcrypt';
import { UserAlreadyExistsException } from './exceptions/userAlreadyExists.exception';
import { User } from './users/schemas/user.schema';

@Injectable()
export class IdentityService {
    constructor(
        @Inject('IDENTITY_MODEL')
        private identityModel: Model<Identity>,
        private jwtService:JwtService
        ) {}

    hello(message){
        return message;
    }

   
  async register(createIdentityDto: CreateIdentityDto): Promise<User> {
    // Check if the username already exists
    const existingUser = await this.identityModel.findOne({ username: createIdentityDto.username }).exec();
    if (existingUser) {
        throw new UserAlreadyExistsException(); // Remove the argument
    }

    // Hash the password using bcrypt with a salt round of 10
    const hashedPassword = await bcrypt.hash(createIdentityDto.password, 10);

    const newUser = new this.identityModel({
        name: createIdentityDto.name as string, // Update the type to 'string'
        username: createIdentityDto.username,
        password: hashedPassword, // Store the hashed password
    });
    const savedUser = await newUser.save();

    // Cast the result to 'User' after ensuring it aligns with the 'User' type
    return newUser as User;
  }

    

    async validateUser(loginDto:LoginDto){
        let loginResult =await this.identityModel.findOne({
            username:loginDto.username,
            password:loginDto.password,
        });

        let jsonData =loginResult.toObject();
        let {__v, _id, ...userData}=jsonData;

        return {
            id:jsonData._id,
            ...userData
        }
    }

    async getUserbyUsername(username:string){
        let loginResult =await this.identityModel.findOne({
            username:username,
           
        });

        if(loginResult===null){
            return null;
        }
        let jsonData =loginResult.toObject();
        let {__v, _id, ...userData}=jsonData;

        return {
            id:jsonData._id,
            ...userData
        }
    }
    async login(user:any){
        //console.log(command)
        let payload = {
            id:user._id,
            name:user.name,
            username:user.username

        };
        
        var token =this.jwtService.sign(payload);
        var tokenvalue:any =this.jwtService.decode(token);
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

        return{
            access_token:this.jwtService.sign(payload),
            expires_in:tokenvalue.exp,

        };
        //let jsonData =loginResult.toObject();
        //let {__v, _id, ...userData}=jsonData;

        //return {
            //id:jsonData._id,
            //...userData
        //}
    }
}
