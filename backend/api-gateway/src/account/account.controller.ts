import {
  Controller,
  Get,
  ParseFileOptions,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AccountService } from './account.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller('account')
export class AccountController implements OnModuleInit {
  constructor(
    private accountServices: AccountService,
    @Inject('ACC_SERVICE') private readonly accountClient: ClientKafka,
  ) {}

  @Get('hello')
  getHello(): any {
    return this.accountServices.hello();
  }

  @Post('sign-up')
  async register(@Request() req: Request) {
    return this.accountServices.register({ body: req.body });
  }

  @Post('sign-in')
  async login(@Request() req: Request) {
    return this.accountServices.login({ body: req.body });
  }

  onModuleInit() {
    this.accountClient.subscribeToResponseOf('hellofromapi');
    this.accountClient.subscribeToResponseOf('register');
    this.accountClient.subscribeToResponseOf('login');
  }
}
