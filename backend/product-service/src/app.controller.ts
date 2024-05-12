import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';

@Controller('product')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  async getAllProducts() {
    return await this.productService.findAllProducts();
  }

  @Post('create-product')
  async create(@Body() reqBody: any) {
    return this.appService.create(reqBody);
  }
}
