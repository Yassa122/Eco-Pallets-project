import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { ProductService } from './product/product.service'; // Import ProductService
import { ProductController } from './product/product.controller';
import { CreateProductDto } from './product/dto/create-product.dto';
import { ProductSchema } from './product/schemas/product.schema';
import { KafkaService } from './product/kafka/kafka.service';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb+srv://Admin:98pE-8FZADg8bbZ@eco-pallets.saefewe.mongodb.net/plastic-pallets-products?retryWrites=true&w=majority&appName=Eco-Pallets',
    ),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],

  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    CreateProductDto,
    ProductController,
    KafkaService,
  ],
})
export class AppModule {}
