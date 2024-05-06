import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule

@Module({
  imports: [
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost:27017/plastic-pallets'), // Example MongoDB URI
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
