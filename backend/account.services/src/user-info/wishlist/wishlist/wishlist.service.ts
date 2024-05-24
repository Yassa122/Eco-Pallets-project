// wishlist.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Wishlist } from '../../interfaces/wishlist';
import { Product } from '../../interfaces/product';
import { AddProductWishlistDto } from '../../dto/add-to-wishlist.dto';
import { RemoveProductWishlistDto } from 'src/user-info/dto/remove-from-wishlist.dto';
import { User } from 'src/identity/schemas/user.schema';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Wishlist') private readonly wishlistModel: Model<Wishlist>,
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  async findWishlistByUserId(userId: string): Promise<Wishlist> {
    const wishlist = await this.wishlistModel.findOne({ userId })
      .populate('products.productId')
      .exec();

    if (!wishlist) {
      throw new NotFoundException(`Wishlist for user with ID ${userId} not found.`);
    }

    return wishlist;
  }

  // async addProductToWishlist(userId: string, { productId }: AddProductWishlistDto): Promise<Wishlist> {
  //   const product = await this.productModel.findById(productId);
  //   if (!product) {
  //     throw new NotFoundException(`Product with ID ${productId} not found.`);
  //   }

  //   let wishlist = await this.wishlistModel.findOne({ userId });

  //   if (wishlist) {
  //     // Check if the product is already in the wishlist
  //     const productExists = wishlist.products.some((item) => item.productId.toString() === productId);

  //     if (productExists) {
  //       throw new ConflictException(`Product with ID ${productId} is already in the wishlist.`);
  //     }

  //     // Add the new product to the existing wishlist
  //     wishlist.products.push({
  //       productId: new Types.ObjectId(productId),
  //       name: product.name,
  //       description: product.description,
  //       images: product.images,
  //       price: product.price,
  //       color: product.color,
  //       size: product.size,
  //       material: product.material,
  //       availability: product.availability,
  //       rentalOptions: product.rentalOptions,
  //       addedAt: undefined
  //     });
  //     await wishlist.save();
  //   } else {
  //     // Create a new wishlist if the user doesn't have one yet
  //     wishlist = new this.wishlistModel({
  //       userId,
  //       products: [{
  //         productId: new Types.ObjectId(productId),
  //         name: product.name,
  //         description: product.description,
  //         images: product.images,
  //         price: product.price,
  //         color: product.color,
  //         size: product.size,
  //         material: product.material,
  //         availability: product.availability,
  //         rentalOptions: product.rentalOptions
  //       }]
  //     });
  //     await wishlist.save();

  //     // Link this wishlist to the user
  //     await this.userModel.findByIdAndUpdate(userId, { $set: { wishlist: wishlist._id } });
  //   }

  //   return wishlist;
  // }

  async removeProductFromWishlist(userId: string, { productId }: RemoveProductWishlistDto): Promise<Wishlist> {
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
  

  async addItemToCartFromWishlist(userId: string, productId: string): Promise<Types.ObjectId[]> {
    console.log("Received UserId:", userId); // Debug log
    console.log("Received ProductId:", productId); // Debug log

    const user = await this.userModel.findById(userId).populate('wishlist').exec();
    if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    console.log("User's Wishlist ID:", user.wishlist?._id); // Debug log

    if (!user.wishlist) {
        throw new NotFoundException(`Wishlist for user with ID ${userId} not found.`);
    }

    const wishlist = await this.wishlistModel.findById(user.wishlist._id);
    if (!wishlist) {
        throw new NotFoundException(`Wishlist for user with ID ${userId} not found.`);
    }

    console.log("Wishlist Products Detailed:", JSON.stringify(wishlist.products, null, 2));

    const productIndex = wishlist.products.findIndex(item => {
        console.log(`Comparing ${item.productId.toString()} to ${productId}`);
        return item.productId.toString() === productId;
    });

    if (productIndex === -1) {
        throw new NotFoundException(`Product with ID ${productId} is not in the wishlist.`);
    }

    const isProductInCart = user.cart.some(id => id.toString() === productId);
    if (isProductInCart) {
        throw new ConflictException(`Product with ID ${productId} is already in the cart.`);
    }

    // Add product to the cart
    user.cart.push(new Types.ObjectId(productId));

    // Remove product from the wishlist
    wishlist.products.splice(productIndex, 1);

    await wishlist.save();
    await user.save();

    // Return only the cart array
    return user.cart;
  }
}
