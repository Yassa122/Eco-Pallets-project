import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { ProductService } from './product/product.service'; // Import ProductService
import { CreateProductDto } from './product/dto/create-product.dto';
import { KafkaConsumerService } from './kafka/kafka.service';
import { ProductKafkaModule } from './kafka/kafka.module';
@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/plastic-pallets-products',
    ),
    ProductKafkaModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    ProductService,
    CreateProductDto,
    KafkaConsumerService,
  ],
})
export class AppModule {}
