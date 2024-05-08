import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateListingDto } from './dto/service.dto';
import { AddToFavDto } from './dto/fav.dto';

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

  async addToFavorites(name: string, image: string, price: number): Promise<AddToFavDto> {
    try {
      const favoriteItem = await this.favModel.create({
        name,
        image,
        price,
        isFavorite: true,
      });
      console.log('Added to favorites:', favoriteItem);
      return favoriteItem;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
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

  getHello(): string {
    return 'Hello World!';
  }
}
