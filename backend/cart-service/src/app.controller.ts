import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
  Put,
  Delete,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCartDto } from './dto/cart.dto';
import { makeOrderDto } from './dto/order.dto';

import { CartItemDto } from './dto/cartItem.dto';
import { CurrentUser } from './decorators/get-user-id.decorator';
import { Response, Request } from 'express'; // Import Response from express
import { use } from 'passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    //working
    return this.appService.getHello();
  }

  @Get('pages/paymentSuccess') // Decorate the method correctly
  async handleSuccess(@Res() res: Response, @Req() req: Request): Promise<any> {
    try {
      // Retrieve the userId from the query parameters
      const userId = req.query.userId as string;

      if (!userId) {
        throw new Error('User ID not found in the request.');
      }
      // Get the cart items of the user based on the userId
      await this.appService.handleSuccessfulPayment(userId);
      //  await this.appService.clearCart(userId);
      // await this.makeOrder(userId, makeOrderDto);
      res.redirect('http://localhost:3000/pages/home?success=true');
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).send('Error placing order');
    }
  }

  async makeOrder(
    userId: string,
    @Body() makeOrderDto: makeOrderDto,
  ): Promise<any> {
    return this.appService.makeOrder(userId, makeOrderDto);
  }

  @Post('create-cart') //working
  async createCart(
    @Body() createCartDto: CreateCartDto,
    @CurrentUser('userId') userId: string,
  ): Promise<CreateCartDto> {
    return this.appService.createCart(createCartDto, userId);
  }
  @Get('AllCarts') //working
  async getAllCarts() {
    return this.appService.getAllCarts();
  }

  @Get('MyCart') //working
  async getCartsByUserId(@CurrentUser('userId') userId: string) {
    return this.appService.getCartsByUserId(userId);
  }

  @Get('cartItems') //working
  async getCartItemsByUserId(@CurrentUser('userId') userId: string) {
    return this.appService.getCartItemsByUserId(userId);
  }

  @Put('addQuantity') //working
  async addOneQuantity(
    @CurrentUser('userId') userId: string,
    @Body('prodId') prodId: string,
  ) {
    return this.appService.addOneQuantity(userId, prodId);
  }

  @Put('subtractQuantity') //working
  async subtractOneQuantity(
    @CurrentUser('userId') userId: string,
    @Body('prodId') prodId: string,
  ) {
    return this.appService.subtractOneQuantity(userId, prodId);
  }
  @Delete('removeCartItem') //working
  async removeCartItem(
    @CurrentUser('userId') userId: string,
    @Body('prodId') prodId: string,
  ): Promise<any> {
    return this.appService.removeCartItem(userId, prodId);
  }
  @Post('createCartItem') //working
  async createCartItem(@Body() cartItem: CartItemDto): Promise<CartItemDto> {
    return this.appService.createCartItem(cartItem);
  }
  @Post('addToCart') //working
  async addToCart(
    @CurrentUser('userId') userId: string,
    @Body() cartItem: CartItemDto,
  ): Promise<any> {
    return this.appService.addToCart(userId, cartItem);
  }

  @Put('applyPromoCode') //working
  async applyPromoCode(
    @CurrentUser('userId') userId: string,
    @Body('promoCode') promoCode: string,
  ): Promise<any> {
    return this.appService.applyPromoCode(userId, promoCode);
  }
  @Put('resetPromoCode') //working
  async resetPromoCode(@CurrentUser('userId') userId: string): Promise<any> {
    return this.appService.resetPromoCode(userId);
  }
  @Post('stripe') //working
  async stripe(@CurrentUser('userId') userId: string): Promise<any> {
    return this.appService.createStripe(userId);
  }
  @Get('orderhistory')
  async getOrderHistory(@CurrentUser('userId') userId: string) {
    return this.appService.getOrderHistory(userId);
  }
}
