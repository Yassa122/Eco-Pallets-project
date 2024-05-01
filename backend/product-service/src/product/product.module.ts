import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema } from './schemas/product.schema';
import { productProviders } from './database/product.providers';
import { databaseProviders } from './database/database.providers';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])], // Corrected schema name
  controllers: [ProductController],
  providers: [ProductService,...databaseProviders, ...productProviders],
  exports: [ProductService, MongooseModule], // Make sure to export MongooseModule], 
})
export class ProductModule {}
