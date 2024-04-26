import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Identity } from './interfaces/identity';
import { CreateIdentityDto } from './dto/create.identity.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

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

    async register(CreateIdentityDto:CreateIdentityDto){
        const createIdentity= new this.identityModel(CreateIdentityDto)
        let saveResult = await createIdentity.save();
        console.log(saveResult)
        return saveResult;
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
