import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/cart.dto';
import { CartItemDto } from './dto/cartItem.dto';

const stripe = require('stripe')(
  'sk_test_51PDlJnP0bLgNNnYQV2v1dxD0RysfZXXUJYZJnSTQ2fmMlBfA4yu1zH9khjbvZcyZLsovYZNSo9hXITRC0ZXKpYgH00dYznYGKg',
);

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<any>,
    @InjectModel('CartItem') private readonly cartItemModel: Model<any>,
    @InjectModel('PromoCode') private readonly promoCodeModel: Model<any>,
  ) {}

  getHello(): string {
    return 'Hello from CART SERVICE!';
  }

  async createCart(
    createCartDto: CreateCartDto,
    userId: string,
  ): Promise<CreateCartDto> {
    const createdCart = new this.cartModel(createCartDto);
    createdCart.userId = userId;
    return createdCart.save();
  }

  async getAllCarts() {
    return this.cartModel.find().exec();
  }

  async getCartsByUserId(userId: string) {
    return this.cartModel.find({ userId }).exec();
  }

  async getCartItemsByUserId(userId: string) {
    const cart = await this.cartModel
      .findOne({ userId })
      .select('cartItems')
      .exec();
    if (!cart) {
      return 'no cart for this userId';
    }
    return cart.cartItems;
  }

  async addOneQuantity(userId: string, prodId: string): Promise<any> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }

    const cartItemIndex = cart.cartItems.findIndex(
      (item) => item.productId == prodId,
    );
    if (cartItemIndex === -1) {
      throw new Error('CartItem not found');
    }

    cart.cartItems[cartItemIndex].quantity++;
    const updatedCartItem = cart.cartItems[cartItemIndex];
    updatedCartItem.totalPrice =
      updatedCartItem.quantity * updatedCartItem.price;

    return cart.save();
  }

  async subtractOneQuantity(userId: string, prodId: string): Promise<any> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }

    const cartItemIndex = cart.cartItems.findIndex(
      (item) => item.productId == prodId,
    );
    if (cartItemIndex === -1) {
      throw new Error('CartItem not found');
    }

    if (cart.cartItems[cartItemIndex].quantity === 1) {
      return cart;
    }
    cart.cartItems[cartItemIndex].quantity--;
    const updatedCartItem = cart.cartItems[cartItemIndex];
    updatedCartItem.totalPrice =
      updatedCartItem.quantity * updatedCartItem.price;

    return cart.save();
  }

  async removeCartItem(userId: string, prodId: string): Promise<any> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }

    const cartItemIndex = cart.cartItems.findIndex(
      (item) => item.productId == prodId,
    );
    if (cartItemIndex === -1) {
      throw new Error('CartItem not found');
    }

    cart.cartItems.splice(cartItemIndex, 1);
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

    const existingCartItem = cart.cartItems.find(
      (item) => item.productId === cartItem.productId,
    );

    if (existingCartItem) {
      existingCartItem.quantity += cartItem.quantity;
    } else {
      cart.cartItems.push(cartItem);
    }

    return cart.save();
  }

  async applyPromoCode(userId: string, promoCode: string): Promise<any> {
    const discount = await this.promoCodeModel.findOne({ promoCode }).exec();
    if (!discount) {
      throw new Error('Invalid Promo Code');
    }
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.PromoCodeMultiplier = 1 - discount.discountInPercent / 100;
    cart.totalPrice = cart.PromoCodeMultiplier * cart.Subtotal;
    await cart.save();
    return { discount, cart };
  }

  async resetPromoCode(userId: string): Promise<any> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.PromoCodeMultiplier = 1;
    cart.totalPrice = cart.PromoCodeMultiplier * cart.Subtotal;
    await cart.save();
    return { cart };
  }

  async createStripe(userId: string): Promise<any> {
    const userCart = await this.cartModel.findOne({ userId });
    if (!userCart) {
      throw new Error('Cart not found');
    }

    let session;
    if (userCart.PromoCodeMultiplier < 1) {
      const userCoupon = await stripe.coupons.create({
        percent_off:
          Math.round((1 - userCart.PromoCodeMultiplier) * 100 * 100) / 100,
        duration: 'once',
      });

      session = await stripe.checkout.sessions.create({
        line_items: userCart.cartItems.map((cartItem) => ({
          price_data: {
            currency: 'egp',
            unit_amount: cartItem.price * 100,
            product_data: {
              name: cartItem.productName,
            },
          },
          quantity: cartItem.quantity,
        })),
        discounts: [{ coupon: userCoupon.id }],
        mode: 'payment',
        success_url: `http://localhost:3000/pages/home`,
        cancel_url: `http://localhost:3000/pages/cart`,
      });
    } else {
      session = await stripe.checkout.sessions.create({
        line_items: userCart.cartItems.map((cartItem) => ({
          price_data: {
            currency: 'egp',
            unit_amount: cartItem.price * 100,
            product_data: {
              name: cartItem.productName,
            },
          },
          quantity: cartItem.quantity,
        })),
        mode: 'payment',
        success_url: `http://localhost:3000/success.html`,
        cancel_url: `http://localhost:3000/cancel.html`,
      });
    }
    return session;
  }
}
