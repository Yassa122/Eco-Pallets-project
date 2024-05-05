import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/cart.dto'; 
import { CartItemDto } from './dto/cartItem.dto'; 

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<any>,
    @InjectModel('CartItem') private readonly cartItemModel: Model<any>

  ) {}

  getHello(): string {
    return 'Hello from CART SERVICE!';
  }

  async createCart(createCartDto: CreateCartDto): Promise<CreateCartDto> {
    const createdCart = new this.cartModel(createCartDto);
    return createdCart.save();
  }
  async getAllCarts() {
    return this.cartModel.find().exec();
  }

  async getCartsByUserId(userId: string) {
    return this.cartModel.find({ userId }).exec();
  }

  async getCartItemsByUserId(userId: string) {
    const cart = await this.cartModel.findOne({ userId }).select('cartItems').exec();
    return cart ? cart.cartItems : [];
  }

  async addOneQuantity(userId: string, cartItemId: String) {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }
    const cartItem = cart.cartItems.find(item => item.productId == cartItemId);
    if (!cartItem) {
      throw new Error('CartItem not found');
    }
    cartItem.quantity++;
    return cart.save();

  }

  async createCartItem(cartItem: CartItemDto): Promise<CartItemDto> {
    const createdCartItem = new this.cartItemModel(cartItem);
    return createdCartItem.save();
  }

  async addToCart(userId: string, cartItem: CartItemDto): Promise<any> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Check if the cartItem already exists in the cart
    const existingCartItem = cart.cartItems.find(item => item.productId === cartItem.productId);

    if (existingCartItem) {
      // If the cartItem already exists, update its quantity
      existingCartItem.quantity += cartItem.quantity;
    } else {
      // If the cartItem does not exist, add it to the cart
      cart.cartItems.push(cartItem);
    }

    // Save the updated cart
    return cart.save();
  }
}
