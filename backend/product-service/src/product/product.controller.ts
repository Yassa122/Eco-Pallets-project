// product.controller.ts

import { Controller, Post, Body, Get, Param, Query, Delete, Req, UnauthorizedException, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { CustomizationDto } from './dto/customization.dto';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ProductWishlistDto } from './dto/product-wishlist.dto';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {
    
  }

  //working   
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  //working
  // @Get()
  // async getAllProducts() {
  //   return await this.productService.findAllProducts();
  // }

  @Get('/getProductById/:id')
  async viewProductDetails(@Param('_id') id: string): Promise<Product> {
    console.log(id); // Logging the id parameter
    return this.productService.findById(id);
  }
  @Post(':id/addreview')
  async addReview(@Param('_id') productId: string,@Query('userId') userId: string,@Body() createReviewDto: CreateReviewDto) {
    return this.productService.addReview(productId, userId,createReviewDto);
  }
  @Get(':id/reviews')
  async viewReviews(@Param('_id') productId: string): Promise<Review[]> {
    return this.productService.viewReviews(productId);
  }
  @Delete('reviews/:id/:userId')
async deleteReview(
  @Param('_id') id: string,
  @Param('userId') userId: string
): Promise<void> {
  return this.productService.deleteReview(id, userId);
} 
  // @Post(':id/wishlist')
  // async addToWishlist(@Param('_id') productId: string,@Body() createWishlistDto: CreateWishlistDto,): Promise<Wishlist> {
  //   return this.productService.addToWishlist({
  //     ...createWishlistDto,
  //     productId, 
  //   });
  // }
  @Get('my-wishlist')
  getWishlist(@CurrentUser() userId: string) {
    return this.productService.findWishlistByUserId(userId);
  }

  @Post('add-to-wishlist')
  addProduct(@Body() addProductDto: ProductWishlistDto, @CurrentUser() userId: string) {
    return this.productService.addProductToWishlist(userId, addProductDto);
  }

@Delete('remove-from-wishlist')
removeProduct(@Body() removeProductDto: ProductWishlistDto, @CurrentUser() userId: string) {
  return this.productService.removeProductFromWishlist(userId, removeProductDto);
}


@Put(':productId/customize') 
async customizeProduct(@Param('productId') productId: string, @Body() customizationDto: CustomizationDto,) {
  return this.productService.customizeProduct(productId, customizationDto);
}




  
}