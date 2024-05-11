// wishlist.controller.ts
import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { AddProductWishlistDto } from '../../dto/add-to-wishlist.dto';
import {RemoveProductWishlistDto} from '../../dto/remove-from-wishlist.dto'

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get(':userId')
  getWishlist(@Param('userId') userId: string) {
    return this.wishlistService.findWishlistByUserId(userId);
  }

  @Post('add')
  addProduct(@Body() addProductDto: AddProductWishlistDto, @Param('userId') userId: string) {
    return this.wishlistService.addProductToWishlist(userId, addProductDto);
  }

  @Delete('remove')
  removeProduct(@Body() removeProductDto: RemoveProductWishlistDto, @Param('userId') userId: string) {
    return this.wishlistService.removeProductFromWishlist(userId, removeProductDto);
  }
}
