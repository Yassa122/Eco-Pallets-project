import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Param } from '@nestjs/common';
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
  @UsePipes(new ValidationPipe({ transform: true }))
  async createCart(@Body() createCartDto: CreateCartDto): Promise<CreateCartDto> {
    return this.appService.createCart(createCartDto);
  }
  @Get('carts')
  async getAllCarts() {
    return this.appService.getAllCarts();
  }

  @Get('carts/:userId')
  async getCartsByUserId(@Param('userId') userId: string) {
    return this.appService.getCartsByUserId(userId);
  }
}
