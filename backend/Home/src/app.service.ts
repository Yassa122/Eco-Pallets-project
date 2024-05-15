import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListingDto } from './dto/service.dto';
import { AddToFavDto } from './dto/fav.dto'
;
import { ObjectId } from 'mongodb';


@Injectable()
export class AppService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<any>,
    @InjectModel('Favorite') private readonly favModel: Model<any>
  ) {}

  async createListing(name: string, image: string, price: number): Promise<CreateListingDto> {
    try {
      const newListing = await this.itemModel.create({
        name,
        image,
        price,
      });
      console.log('Created Listing:', newListing);
      return newListing;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  }

//   async addToFavorites(name: string, image: string, price: number, productID: number, userId: number): Promise<AddToFavDto | string> {
//     try {
//       const existingFavorite = await this.favModel.findOne({ productID, userId ,name}).exec();
  
//       if (existingFavorite) {
//         return 'Item already exists in favorites';
//       }
  
//       const favoriteItem = await this.favModel.create({
//         name,
//         image,
//         price,
//         productID,
//         userId,
//         isFavorite: true,
//       });
  
//       console.log('Added to favorites:', favoriteItem);
//       return favoriteItem;
//     } catch (error) {
//       console.error('Error adding to favorites:', error);
//       throw new Error(`Failed to add item to favorites: ${error.message}`);
//     }
// }

async addToFavorites(userId: string, cartItem: AddToFavDto): Promise<any> {
  let favModel = await this.favModel.findOne({ userId }).exec();
  
  if (!favModel) {
    // If favorites not found, create a new favorites document
    favModel = new this.favModel({
      userId: userId,
      name: cartItem.name,
      image: cartItem.image,
      price: cartItem.price,
    });
  } else {
    // Update existing favorite item or add a new one
    favModel.name = cartItem.name;
    favModel.image = cartItem.image;
    favModel.price = cartItem.price;
  }

  // Save the updated favorites
  return favModel.save();
}
  

  async getAllItems(): Promise<any[]> {
    try {
      const allItems = await this.itemModel.find().exec();
      console.log('Retrieved all items:', allItems);
      return allItems;
    } catch (error) {
      console.error('Error retrieving all items:', error);
      throw error;
    }
  }

  async removeFromFavorites(itemId: string): Promise<void> {
    try {
      const deletedItem = await this.favModel.findByIdAndDelete(itemId).exec();

      if (!deletedItem) {
        throw new Error('Item not found in favorites');
      }

      console.log('Removed from favorites:', deletedItem);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  async searchItem(query: string): Promise<any[]> {
    try {
      const foundItems = await this.itemModel.find({ name: { $regex: query, $options: 'i' } })
        .select('name image price')
        .exec();
      return foundItems;
    } catch (error) {
      console.error('Error searching for items:', error);
      throw error;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
