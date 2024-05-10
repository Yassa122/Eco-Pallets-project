import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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
  async addToFavorites(@Body() body: { name: string; image: string; price: number }) {
    return this.appService.addToFavorites(body.name, body.image, body.price);
  }

  @Get('/items')
  async getAllItems() {
    return await this.appService.getAllItems();
  }

  @Delete('favorites/:id')
  async removeFromFavorites(@Param('id') id: string): Promise<void> {
    return this.appService.removeFromFavorites(id);
  }
}
