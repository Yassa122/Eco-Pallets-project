import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListingDto } from './dto/service.dto';
import { AddToFavDto, AddToFavItemDto } from './dto/fav.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<any>,
    @InjectModel('Favorite') private readonly favModel: Model<any>,
  ) {}

  async createFav(
    addToFavDto: AddToFavDto,
    userId: string,
  ): Promise<AddToFavDto> {
    const createdFav = new this.favModel(addToFavDto);
    createdFav.userId = userId;
    return createdFav.save();
  }

  async createListing(
    name: string,
    image: string,
    price: number,
  ): Promise<CreateListingDto> {
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

  async addToFavorites(userId: string, favItem: AddToFavItemDto): Promise<any> {
    let favModel = await this.favModel.findOne({ userId }).exec();

    if (!favModel) {
      // If no favorites model exists for the user, create a new one
      favModel = new this.favModel({ userId, items: [] });
    }

    // Check if the item already exists in the favorites
    const favModelItem = favModel.items.find(
      (item) => item.productId === favItem.productId,
    );

    if (favModelItem) {
      // If the item already exists
      throw new Error('Item already exists');
    } else {
      // If the item does not exist, add it to the favorites
      favModel.items.push(favItem);
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
      const foundItems = await this.itemModel
        .find({ name: { $regex: query, $options: 'i' } })
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
