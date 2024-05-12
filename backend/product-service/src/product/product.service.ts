import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { CustomizationDto } from './dto/customization.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('Wishlist') private readonly wishlistModel: Model<Wishlist>
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

async findAllProducts(): Promise<Product[]> {
    try {
      const products = await this.productModel.find().exec();
      if (!products || products.length === 0) {
        throw new NotFoundException('No products found');
      }
      return products;
    } catch (error) {
      console.error('Error retrieving all products', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Product> {
    try {
      console.log(`Finding product with ID: ${id}`);
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      console.error(`Error finding product with ID: ${id}`, error.stack);
      throw error;
    }
  }
  async addReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const review = new this.reviewModel({
      productId: productId,
      userId: userId, 
      ...createReviewDto,
    });
    return review.save();
  }
  async viewReviews(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId }).exec();
  }
  async deleteReview(id: string, userId: string): Promise<void> {
    const review = await this.reviewModel.findById(id).exec();
    console.log('Found review:', review); // Add this logging statement
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    if (review.userId !== userId) {
      throw new UnauthorizedException('You are not authorized to delete this review');
    }
    await this.reviewModel.findByIdAndDelete(id).exec();
}

  async addToWishlist(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const newWishlistItem = new this.wishlistModel(createWishlistDto);
    return newWishlistItem.save();
  }
  async removeFromWishlist(productId: string): Promise<Wishlist | null> {
    return this.wishlistModel.findOneAndDelete({ productId }).exec();
  }
  async customizeProduct(productId: string, customizationDto: CustomizationDto): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.color = customizationDto.color;
    product.size = customizationDto.size;
    product.material = customizationDto.material;

    return product.save();
  }
  
}
