// wishlist.controller.ts
import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddProductWishlistDto } from '../../dto/add-to-wishlist.dto';
import {RemoveProductWishlistDto} from '../../dto/remove-from-wishlist.dto'
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get('my-wishlist')
  getWishlist(@CurrentUser() userId: string) {
    return this.wishlistService.findWishlistByUserId(userId);
  }

  // @Post('add')
  // addProduct(@Body() addProductDto: AddProductWishlistDto, @CurrentUser() userId: string) {
  //   return this.wishlistService.addProductToWishlist(userId, addProductDto);
  // }

  @Delete('remove')
removeProduct(@Body() removeProductDto: RemoveProductWishlistDto, @CurrentUser() userId: string) {
  return this.wishlistService.removeProductFromWishlist(userId, removeProductDto);
}


  @Post('wishlist-to-cart/:id')
  async addToCartFromWishlist(
    @CurrentUser() userId: string,
    @Param('id') productId: string
  ) {
    return this.wishlistService.addItemToCartFromWishlist(userId, productId);
  }

}
