import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IdentityService } from "../identity.service";
import { LoginDto } from "../dto/login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local'){
constructor(private readonly identityService:IdentityService){
    super();
}
async validate(username:string, password:string):Promise<any>{
    console.log('validate:' ,username,password);

    var loginDto:LoginDto ={
        username,password
    }
    const user = await this.identityService.validateUser(loginDto);

    if(!user){
        throw new UnauthorizedException();
    }
    console.log('validated user:', user);
    return user;
}
}