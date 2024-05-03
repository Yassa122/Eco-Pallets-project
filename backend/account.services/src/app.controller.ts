//app.controller.ts is used to import all the logic from the app.service.ts file
// you need to define each method type eg.. get, post, put, delete

import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
//n
@Controller('account')
export class AppController {
  constructor(private accountServices: AppService) {}

  @Get('hello')
  getHello(): any {
    return this.accountServices.hello();
  }

  @Post('sign-up')
  async register(@Body() reqBody: any) {
    return this.accountServices.register(reqBody);
  }

  @Post('sign-in') 
  async login(@Body() reqBody: any) {
    return this.accountServices.login(reqBody);
  }
}
