import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateListingDto } from './dto/service.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/create-listings')
  async createListing(@Body() createListingDto: CreateListingDto): Promise<CreateListingDto> {
    const { name, image, price } = createListingDto;
    return await this.appService.createListing(name, image, price);
  }

  @Post('/addToFavorites')
  async addToFavorites(@Body() body: { name: string; image: string; price: number ,userID: string}) {
    return this.appService.addToFavorites(body.name, body.image, body.price,body.userID);
  }

  @Get('/items')
  async getAllItems() {
    return await this.appService.getAllItems();
  }

  @Delete('favorites/:id')
  async removeFromFavorites(@Param('id') id: string): Promise<void> {
    return this.appService.removeFromFavorites(id);
  }

  @Get('/searchItem/:query') // Define route to accept query parameter in URL path
  async searchItem(@Param('query') query: string) {
    return await this.appService.searchItem(query);
  }
}
