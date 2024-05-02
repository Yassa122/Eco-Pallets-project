//app.controller.ts is used to import all the logic from the app.service.ts file
// you need to define each method type eg.. get, post, put, delete

import { Controller, Post, Get, Body, Res } from '@nestjs/common';
import { Response } from 'express'; // Make sure to import Response from express
import { AppService } from './app.service';
@Controller('account')
export class AppController {
  constructor(private accountServices: AppService) {}

  @Get('hello')
  getHello(): any {
    return this.accountServices.hello();
  }
  //
  @Post('sign-up')
  async register(@Body() reqBody: any) {
    return this.accountServices.register(reqBody);
  }

  @Post('sign-in')
  async login(@Body() reqBody: any, @Res() res: Response) {
    const result = await this.accountServices.login(reqBody);
    if (result.success === true) {
      res.cookie('accessToken', result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Set to true in production
        sameSite: 'strict', // Adjust according to your cross-site request needs
        expires: new Date(Date.now() + 3600000), // Set cookie to expire in 1 hour
      });
      return res.status(200).json(result);
    } else {
      return res.status(401).json({ message: 'Authentication failed' });
    }
  }
}
