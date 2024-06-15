import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemSchema } from './schema/items.schema'; // Import the ItemSchema
import { favschema } from './schema/fav.schema'; // Import the schema for favorites

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Admin:98pE-8FZADg8bbZ@eco-pallets.saefewe.mongodb.net/plastic-pallets-home?retryWrites=true&w=majority&appName=Eco-Pallets',
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
