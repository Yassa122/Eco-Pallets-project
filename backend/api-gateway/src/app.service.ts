import { Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy, Transport } from '@nestjs/microservices';
import {}
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  
  
}
