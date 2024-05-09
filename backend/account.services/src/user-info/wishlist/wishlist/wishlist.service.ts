// wishlist.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wishlist } from '../../interfaces/wishlist';
import { Product } from '../../interfaces/product';
import { AddProductWishlistDto } from '../../dto/add-to-wishlist.dto';
import { RemoveProductWishlistDto } from 'src/user-info/dto/remove-from-wishlist.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('Wishlist') private readonly wishlistModel: Model<Wishlist>,
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async findWishlistByUserId(userId: string): Promise<Wishlist> {
    const wishlist = await this.wishlistModel.findOne({ userId })
      .populate('products.productId', 'name description price images')
      .exec();

    if (!wishlist) {
      throw new NotFoundException(`Wishlist for user with ID ${userId} not found.`);
    }

    return wishlist;
  }

  async addProductToWishlist(userId: string, { productId }: AddProductWishlistDto): Promise<Wishlist> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }
  
    const wishlist = await this.wishlistModel.findOne({ userId });
  
    if (wishlist) {
      // Check if the product is already in the wishlist
      const productExists = wishlist.products.some((item) => item.productId.toString() === productId);
  
      if (productExists) {
        throw new ConflictException(`Product with ID ${productId} is already in the wishlist.`);
      }
  
      // Add the new product to the existing wishlist
      // Convert string productId to ObjectId before pushing
      wishlist.products.push({
          productId: new Types.ObjectId(productId),
          addedAt: undefined
      });
      return wishlist.save();
    } else {
      // Create a new wishlist if the user doesn't have one yet
      const newWishlist = new this.wishlistModel({
        userId,
        products: [{ productId: new Types.ObjectId(productId) }], // Convert here as well
      });
      return newWishlist.save();
    }
  }
  

  async removeProductFromWishlist(userId: string, { productId }: RemoveProductWishlistDto): Promise<Wishlist> {
    const wishlist = await this.wishlistModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId: new Types.ObjectId(productId) } } },
      { new: true }
    );

    if (!wishlist) {
      throw new NotFoundException(`Wishlist for user with ID ${userId} not found.`);
    }

    return wishlist;
  }
}
