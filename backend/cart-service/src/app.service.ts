import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/cart.dto'; // Assuming CreateCartDto is defined in a separate file

@Injectable()
export class AppService {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<any>) {}

  getHello(): string {
    return 'Hello!';
  }

  async createCart(createCartDto: CreateCartDto): Promise<CreateCartDto> {
    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }
}
