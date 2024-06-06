import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
import { Rentals } from './interfaces/rentals';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { CustomizationDto } from './dto/customization.dto';
import { RentProductDto } from './dto/rent-product.dto';
import { productProviders } from './database/product.providers';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
    @InjectModel('Wishlist') private readonly wishlistModel: Model<Wishlist>,
    @InjectModel('Rentals') private readonly rentalModel: Model<Rentals>,
  ) {}
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async viewProductDetails(id: string): Promise<Product> {
    console.log(id);
    try {
      console.log(`Finding product with ID: ${id}`);
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error finding product with ID: ${id}', error.stack);
      throw error;
    }
  }
  async getAllProducts(): Promise<CreateProductDto[]> {
    const products = this.productModel.find().exec();
    console.log('fetch', products);
    return products;
  }

  // async getProductById(id: string): Promise<Product> {
  //   console.log(id)
  //   const product = await this.productModel.findById(id).exec();
  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }
  //   return product;
  // }
  async addReview(
    productId: string,
    userId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    console.log(createReviewDto);
    const review = new this.reviewModel({
      productId,
      userId,
      rating: createReviewDto.rating,
      comment: createReviewDto.comment,
    });
    return review.save();
  }
  async getProductReviews(productId: string): Promise<Review[]> {
    const reviews = await this.reviewModel.find({ productId }).exec();
    console.log(productId);
    console.log(reviews);
    if (!reviews) {
      throw new NotFoundException('No reviews found for this product');
    }
    return reviews;
  }
  async deleteReview(id: string, userId: string): Promise<{ message: string }> {
    const review = await this.reviewModel.findById(id).exec();
    console.log('Found review:', review); // Add this logging statement
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    // Uncomment this if you want to check the user's authorization
    // if (review.userId !== userId) {
    //   throw new UnauthorizedException('You are not authorized to delete this review');
    // }
    await this.reviewModel.findByIdAndDelete(id).exec();
    return { message: 'Review successfully deleted' };
  }

  async addToWishlist(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const newWishlistItem = new this.wishlistModel(createWishlistDto);
    return newWishlistItem.save();
  }

  async getWishlistByUser(userId: string): Promise<any> {
    console.log('Finding wishlist for User ID:', userId); // Add this line
    return this.wishlistModel.find({ userId }).populate('productId').exec();
  }

  async removeFromWishlist(productId: string): Promise<Wishlist | null> {
    return this.wishlistModel.findOneAndDelete({ productId }).exec();
  }
  async customizeProduct(
    productId: string,
    customizationDto: CustomizationDto,
  ): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.color = customizationDto.color;
    product.size = customizationDto.size;
    product.material = customizationDto.material;

    return product.save();
  }

  // async addToCart(productId: string, userId: string) {
  //   // Fetch product details from the database
  //   const product = await this.productModel.findById(productId).exec();
  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }

  //   // Prepare the message payload for Kafka
  //   const messagePayload: CartItemDto = {
  //     cartId: userId,
  //     productId: productId,
  //     productName: product.name,
  //     quantity: 1, // Assuming quantity is initially 1
  //     price: product.price,
  //   };

  //   // Send message to Kafka topic for adding a product to the cart
  //   await this.clientKafka.emit('add-to-cart', messagePayload).toPromise();
  // }
  async rentProduct(
    productId: string,
    rentProductDto: RentProductDto,
  ): Promise<any> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    // console.log(product)
    const { rentalStart, rentalEnd, deposit } = rentProductDto;
    // console.log(rentalStart, rentalEnd)
    // if (!product.rentalOptions.available) {
    //   throw new Error('Product is not available for rent');
    // }
    // console.log(product.rentalOptions.available)

    const startDate = new Date(rentalStart);
    const endDate = new Date(rentalEnd);
    const rentalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    // console.log(rentalDays)
    if (rentalDays <= 0) {
      throw new Error('Invalid rental period');
    }

    const totalPrice = rentalDays * deposit;
    console.log('here');
    // console.log("calc", ((rentalDays*product.rentalOptions.dailyRate)+ product.rentalOptions.deposit))
    console.log('1', rentalDays);
    // console.log("2", product.rentalOptions)
    console.log('3', deposit);
    const rentalRecord = new this.rentalModel({
      productId,
      rentalStart,
      rentalEnd,
      rentalDays,
      // dailyRate: product.rentalOptions.dailyRate,
      deposit,
      totalPrice,
    });
    console.log(rentalRecord);

    await rentalRecord.save();

    return {
      productId,
      rentalStart,
      rentalEnd,
      rentalDays,
      // dailyRate: product.rentalOptions.dailyRate,
      deposit: deposit,
      totalPrice,
    };
  }
}
