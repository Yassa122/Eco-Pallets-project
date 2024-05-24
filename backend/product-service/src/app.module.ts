import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { ProductService } from './product/product.service'; // Import ProductService
import { ProductController } from './product/product.controller';
import { CreateProductDto } from './product/dto/create-product.dto';
import { ProductSchema } from './product/schemas/product.schema';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/plastic-pallets-products',
    ),
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),

  ],

  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    CreateProductDto,
    ProductController,
  ],
})
export class AppModule {}