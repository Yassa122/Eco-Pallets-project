import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartSchema } from './schema/cart.schema'; // Import the ItemSchema
import { CartItemSchema } from './schema/cartItem.schema'; // Import the ItemSchema
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [    
    MongooseModule.forRoot('mongodb://localhost:27017/plastic-pallets-E-commerce'), // Set your MongoDB connection URI and database name
   MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]), // Specify the schema to use
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
