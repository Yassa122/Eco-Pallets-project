import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemSchema } from './schema/items.schema'; // Import the ItemSchema
import { favschema } from './schema/fav.schema'; // Import the schema for favorites

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/plastic-pallets-E-commerce',
    ), // Set your MongoDB connection URI and database name
    MongooseModule.forFeature([
      { name: 'Item', schema: ItemSchema }, // Specify the schema for items
      { name: 'Favorite', schema: favschema }, // Specify the schema for favorites
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
