// product.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { CustomizationDto } from './dto/customization.dto';
import { RentProductDto } from './dto/rent-product.dto';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //working
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }
  @Get('/getAllProducts')
  async getAllProducts(): Promise<CreateProductDto[]> {
    try {
      const products = await this.productService.getAllProducts();
      if (!products || products.length === 0) {
        throw new NotFoundException('No products found');
      }
      return products;
    } catch (error) {
      throw new NotFoundException(
        'Failed to fetch products: ' + (error as Error).message,
      );
    }
  }
  @Get('/productdetails/:id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.viewProductDetails(id);
  }

  @Post(':productId/addreview')
  async addReview(
    @Param('productId') productId: string,
    @CurrentUser('userId') userId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.productService.addReview(productId, userId, createReviewDto);
  }

  @Get('/reviews/:productId')
  async getProductReviews(
    @Param('productId') productId: string,
  ): Promise<Review[]> {
    console.log(productId);
    return this.productService.getProductReviews(productId);
    console.log(productId);
  }

  @Delete('reviews/:id')
  async deleteReview(
    @Param('id') id: string,
    @CurrentUser('userId') userId: string,
  ): Promise<{ message: string }> {
    return this.productService.deleteReview(id, userId);
  }

  @Post(':id/wishlist')
  async addToWishlist(
    @Param('id') productId: string,
    @CurrentUser('userId') userId: string,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.productService.addToWishlist({
      ...createWishlistDto,
      productId,
      userId,
    });
  }
  @Get('/MyWishlist')
  async getWishlistByUser(
    @CurrentUser('userId') userId: string,
  ): Promise<Wishlist[]> {
    try {
      console.log('User ID:', userId); // Add this line
      return await this.productService.getWishlistByUser(userId);
    } catch (error) {
      console.error('Error retrieving wishlist:', error);
      throw new NotFoundException('Failed to retrieve wishlist');
    }
  }

  @Delete('/wishlist/:id')
  async removeFromWishlist(
    @Param('id') productId: string,
    @CurrentUser('userId') userId: string,
  ): Promise<Wishlist | null> {
    return this.productService.removeFromWishlist(productId);
  }

  @Put(':productId/customize')
  async customizeProduct(
    @Param('productId') productId: string,
    @Body() customizationDto: CustomizationDto,
  ) {
    return this.productService.customizeProduct(productId, customizationDto);
  }

  @Post(':productId/rent')
  async rentProduct(
    @Param('productId') productId: string,
    @Body() rentProductDto: RentProductDto,
  ) {
    try {
      const rentalDetails = await this.productService.rentProduct(
        productId,
        rentProductDto,
      );
      return { success: true, rentalDetails };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Let Nest handle the NotFoundException
      } else {
        throw new NotFoundException('Failed to rent product: ' + error.message);
      }
    }
  }
}
