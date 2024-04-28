import { Controller, Post, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('account')
export class AppController {
  constructor(
    private accountServices: AppService,
  ) {}

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
