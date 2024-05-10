import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCartDto } from './dto/cart.dto';
import { CartItemDto } from './dto/cartItem.dto';
import { CurrentUser } from './decorators/get-user-id.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create-cart')
  async createCart(
    @Body() createCartDto: CreateCartDto,
    @CurrentUser('userId') userId: string // Extract userId from token
  ): Promise<CreateCartDto> {
    return this.appService.createCart(createCartDto, userId);
  }
  @Get('carts')
  async getAllCarts() {
    return this.appService.getAllCarts();
  }

  @Get('carts')
  async getCartsByUserId(@CurrentUser('userId') userId: string) {
    return this.appService.getCartsByUserId(userId);
  }

  @Get('cartItems')
  async getCartItemsByUserId(@CurrentUser('userId') userId: string) {
    return this.appService.getCartItemsByUserId(userId);
  }

  @Put('addQuantity/:userId')
  async addOneQuantity(
    @Param('userId') userId: string,
    @Body() cartItemIdObj: { cartItemId: string },
  ) {
    return this.appService.addOneQuantity(userId, cartItemIdObj);
  }

  @Put('subtractQuantity/:userId')
  async subtractOneQuantity(
    @Param('userId') userId: string,
    @Body() cartItemIdObj: { cartItemId: string },
  ) {
    return this.appService.subtractOneQuantity(userId, cartItemIdObj);
  }
  @Delete('removeCartItem/:userId')
  async removeCartItem(
    @Param('userId') userId: string,
    @Body() cartItemIdObj: { cartItemId: string },
  ): Promise<any> {
    return this.appService.removeCartItem(userId, cartItemIdObj);
  }
  @Post('createCartItem')
  async createCartItem(@Body() cartItem: CartItemDto): Promise<CartItemDto> {
    return this.appService.createCartItem(cartItem);
  }
  @Post('addToCart/:userId')
  async addToCart(
    @Param('userId') userId: string,
    @Body() cartItem: CartItemDto,
  ): Promise<any> {
    return this.appService.addToCart(userId, cartItem);
  }

  @Put('applyPromoCode/:userId')
  async applyPromoCode(
    @Param('userId') userId: string,
    @Body('promoCode') promoCode: string,
  ): Promise<any> {
    return this.appService.applyPromoCode(userId, promoCode);
  }
  @Post('stripe/:userId')
  async stripe(@Param('userId') userId:string):Promise<any>{
    return this.appService.createStripe(userId);
  }
}
