import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCartDto } from './dto/cart.dto'; // Assuming CreateCartDto is defined in a separate file

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create-cart')
  async createCart(@Body() createCartDto: CreateCartDto): Promise<CreateCartDto> {
    return this.appService.createCart(createCartDto);
  }
}
