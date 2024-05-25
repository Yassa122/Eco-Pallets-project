import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConflictException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

import { CurrentUser } from 'src/decorators/current-user.decorator';
import { ProductWishlistDto } from './dto/product-wishlist.dto';

@Injectable()
export class ProductService {
  [x: string]: any;

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

// async findAllProducts(): Promise<Product[]> {
//     try {
//       const products = await this.productModel.find().exec();
//       if (!products || products.length === 0) {
//         throw new NotFoundException('No products found');
//       }
//       return products;
//     } catch (error) {
//       console.error('Error retrieving all products', error);
//       throw error;
//     }
//   }

  async findById(id: string): Promise<Product> {
    try {
      console.log(`Finding product with ID: ${id}`);
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      console.error("Error finding product with ID: ${id}", error.stack);
      throw error;
    }
  }
  async getAllProducts(): Promise<CreateProductDto[]> {
    const products = this.productModel.find().exec();
    console.log("fetch", products)
    return(products);
  }
  
  // async getProductById(id: string): Promise<Product> {
  //   console.log(id)
  //   const product = await this.productModel.findById(id).exec();
  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }
  //   return product;
  // }
  async addReview(productId: string, userId: string,
   createReviewDto: CreateReviewDto): Promise<Review> {
    console.log(createReviewDto)
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
    console.log(productId)
    console.log(reviews)
    if (!reviews) {
      throw new NotFoundException('No reviews found for this product');
    }
    return reviews;
  }
  async deleteReview(id: string, userId: string): Promise<void> {
    const review = await this.reviewModel.findById(id).exec();
    console.log('Found review:', review); // Add this logging statement
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    // if (review.userId !== userId) {
    //   throw new UnauthorizedException('You are not authorized to delete this review');
    // }
    await this.reviewModel.findByIdAndDelete(id).exec();
}

  // async addToWishlist(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
  //   const newWishlistItem = new this.wishlistModel(createWishlistDto);
  //   return newWishlistItem.save();
  // }
  // async removeFromWishlist(productId: string): Promise<Wishlist | null> {
  //   return this.wishlistModel.findOneAndDelete({ productId }).exec();
  // }

  async findWishlistByUserId(userId: string): Promise<Wishlist> {
    const wishlist = await this.wishlistModel.findOne({ userId })
      .populate('products.productId')
      .exec();

    if (!wishlist) {
      throw new NotFoundException(`Wishlist for user with ID ${userId} not found.`);
    }

    return wishlist;
  }
  
  async getWishlistByUser(userId: string): Promise<any> {
    console.log('Finding wishlist for User ID:', userId); // Add this line
    return this.wishlistModel.find({ userId }).populate('productId').exec();
  }
  
  async removeFromWishlist(productId: string): Promise<Wishlist | null> {
    return this.wishlistModel.findOneAndDelete({ productId }).exec();
  }

  async addProductToWishlist(userId: string, { productId }: ProductWishlistDto): Promise<Wishlist> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    let wishlist = await this.wishlistModel.findOne({ userId });

    if (wishlist) {
      // Check if the product is already in the wishlist
      const productExists = wishlist.products.some((item) => item.productId.toString() === productId);

      if (productExists) {
        throw new ConflictException(`Product with ID ${productId} is already in the wishlist.`);
      }

      // Add the new product to the existing wishlist
      wishlist.products.push({
        productId: new Types.ObjectId(productId),
        name: product.name,
        description: product.description,
        images: product.images,
        price: product.price,
        color: product.color,
        size: product.size,
        material: product.material,
        availability: product.availability,
        rentalOptions: product.rentalOptions,
        addedAt: undefined
      });
      await wishlist.save();
    } else {
      // Create a new wishlist if the user doesn't have one yet
      wishlist = new this.wishlistModel({
        userId,
        products: [{
          productId: new Types.ObjectId(productId),
          name: product.name,
          description: product.description,
          images: product.images,
          price: product.price,
          color: product.color,
          size: product.size,
          material: product.material,
          availability: product.availability,
          rentalOptions: product.rentalOptions
        }]
      });
      await wishlist.save();

      // Link this wishlist to the user
      // await this.userModel.findByIdAndUpdate(userId, { $set: { wishlist: wishlist._id } });
    }

    return wishlist;
  }

  async removeProductFromWishlist(userId: string, { productId }: ProductWishlistDto): Promise<Wishlist> {
    const wishlist = await this.wishlistModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } }, // Remove the conversion to new String(productId)
      { new: true }
    );
  
    if (!wishlist) {
      throw new NotFoundException(`Wishlist for user with ID ${userId} not found.`);
    }
  
    return wishlist;
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
  async rentProduct(productId:string, rentProductDto: RentProductDto): Promise<any> {
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
    const rentalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
// console.log(rentalDays)
    if (rentalDays <= 0) {
      throw new Error('Invalid rental period');
    }

    const totalPrice = (rentalDays) * deposit;
    console.log("here");
    // console.log("calc", ((rentalDays*product.rentalOptions.dailyRate)+ product.rentalOptions.deposit))
    console.log("1", rentalDays)
    // console.log("2", product.rentalOptions)
    console.log("3",deposit)
    const rentalRecord = new this.rentalModel({
      productId,
      rentalStart,
      rentalEnd,
      rentalDays,
      // dailyRate: product.rentalOptions.dailyRate,
      deposit,
      totalPrice,
    });
    console.log(rentalRecord)

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