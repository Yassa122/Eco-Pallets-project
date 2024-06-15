import { Body, Controller, Get, Put, Req, Request, UseGuards } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { MessagePattern } from '@nestjs/microservices';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { ExistsAuthGuard } from './strategies/exists-auth.guard';
import { CurrentUser } from '../decorators/get-user-id.decorator'; // Adjust the path based on your project structure
import { UpdatePasswordDto } from './dto/update-password.dto';
import mongoose from 'mongoose';

@Controller('identity')
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @MessagePattern('hellofromapi')
  hello(req) {
    console.log(req);
    return this.identityService.hello(req.data);
  }

  @MessagePattern('register')
  async register(command) {
    console.log(command);
    return this.identityService.register(command.data);
  }

  @MessagePattern('guestRegister')
  async guestRegister(command) {
    console.log(command);
    return this.identityService.guestRegister(command.data);
  }
  @UseGuards(LocalAuthGuard)
  @MessagePattern('login')
  async login(command) {
    console.log('command user: ', command.user);
    return this.identityService.login(command.user);
  }
  @UseGuards(JwtAuthGuard)
  @MessagePattern('me')
  async me(command) {
    const { id, ...rest } = command.user;
    return rest;
  }
}
