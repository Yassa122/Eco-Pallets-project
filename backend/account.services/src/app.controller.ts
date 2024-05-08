//app.controller.ts is used to import all the logic from the app.service.ts file
// you need to define each method type eg.. get, post, put, delete

import { Controller, Post, Get, Body, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { GetUserDto } from './get-user.dto';
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

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.accountServices.getUserData(id);
  }

  @Post('update/:id')
  updateUser(@Param('id') id: string, @Body() userData: GetUserDto) {
    return this.accountServices.updateUserData(id, userData);
  }
  // @EventPattern('user_fetched')
  // handleOrderCreated(data:any){
  // this.accountServices.handleUserInfo(data.value)}

  // onModuleInit() {
  //   this.client.subscribeToResponseOf('get_user_info');
  // }
}
