import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/cart.dto';
import { CartItemDto } from './dto/cartItem.dto';
import { makeOrderDto } from './dto/order.dto';

const stripe = require('stripe')(
  'sk_test_51PDlJnP0bLgNNnYQV2v1dxD0RysfZXXUJYZJnSTQ2fmMlBfA4yu1zH9khjbvZcyZLsovYZNSo9hXITRC0ZXKpYgH00dYznYGKg',
);

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<any>,
    @InjectModel('CartItem') private readonly cartItemModel: Model<any>,
    @InjectModel('PromoCode') private readonly promoCodeModel: Model<any>,
    @InjectModel('Order') private readonly ordersModel: Model<any>,
  ) {}

  getHello(): string {
    //working
    return 'Hello from CART SERVICE!';
  }

  async createCart(
    createCartDto: CreateCartDto,
    userId: string,
  ): Promise<CreateCartDto> {
    // working
    const createdCart = new this.cartModel(createCartDto);
    createdCart.userId = userId;
    return createdCart.save();
  }
  async getAllCarts() {
    //working
    return this.cartModel.find().exec();
  }

  async getCartsByUserId(userId: string) {
    //working
    return this.cartModel.find({ userId }).exec();
  }

  async getCartItemsByUserId(userId: string) {
    //working
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
    //working
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

    // Increment the quantity of the cart item
    cart.cartItems[cartItemIndex].quantity++;

    // Recalculate the total price based on the updated quantity
    const updatedCartItem = cart.cartItems[cartItemIndex];
    updatedCartItem.totalPrice =
      updatedCartItem.quantity * updatedCartItem.price;

    // Save the updated cart
    return cart.save();
  }

  async subtractOneQuantity(userId: string, prodId: string): Promise<any> {
    //working
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

    // Check if the quantity is already 1
    if (cart.cartItems[cartItemIndex].quantity === 1) {
      // If quantity is already 1, do not decrement further
      return cart;
    }
    // Decrement the quantity of the cart item
    cart.cartItems[cartItemIndex].quantity--;

    // Recalculate the total price based on the updated quantity
    const updatedCartItem = cart.cartItems[cartItemIndex];
    updatedCartItem.totalPrice =
      updatedCartItem.quantity * updatedCartItem.price;

    // Save the updated cart
    return cart.save();
  }

  async removeCartItem(userId: string, prodId: string): Promise<any> {
    //working
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

    cart.cartItems.splice(cartItemIndex, 1); // Remove the cart item from the array

    return cart.save();
  }

  async createCartItem(cartItem: CartItemDto): Promise<CartItemDto> {
    //working
    const createdCartItem = new this.cartItemModel(cartItem);
    return createdCartItem.save();
  }

  async addToCart(userId: string, cartItem: CartItemDto): Promise<any> {
    //working
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Check if the cartItem already exists in the cart
    const existingCartItem = cart.cartItems.find(
      (item) => item.productId == cartItem.productId,
    );

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

  async applyPromoCode(userId: string, promoCode: string): Promise<any> {
    //working
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
    // Save the updated cart
    return { discount, cart };
  }

  async resetPromoCode(userId: string): Promise<any> {
    //working
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.PromoCodeMultiplier = 1;
    cart.totalPrice = cart.PromoCodeMultiplier * cart.Subtotal;
    await cart.save();
    // Save the updated cart
    return { cart };
  }

  async createStripe(userId: string): Promise<any> {
    //working
    // Fetch the user's cart based on the userId
    const userCart = await this.cartModel.findOne({ userId });
    if (!userCart) {
      throw new Error('Cart not found');
    }

    let session;
    if (userCart.PromoCodeMultiplier < 1) {
      const userCoupon = await stripe.coupons.create({
        percent_off:
          Math.round((1 - userCart.PromoCodeMultiplier) * 100 * 100) / 100, // Round to two decimal places
        duration: 'once',
      });
      // Create a Stripe session with the user's cart items
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

        discounts: [
          {
            coupon: userCoupon.id,
          },
        ],
        mode: 'payment',
        success_url:
          'http://localhost:7000/pages/paymentSuccess?userId=${userId}',
        cancel_url: 'http://localhost:7000/pages/cart',
      });
    } else {
      // Create a Stripe session with the user's cart items
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
        success_url:
          'http://localhost:7000/pages/paymentSuccess?userId=${userId}',
        cancel_url: 'http://localhost:7000/pages/cart',
      });
    }
    // console.log(session.payment_status);
    // Call makeOrder API here if payment is successful
    return session;
  }

  async handleSuccessfulPayment(userId: string): Promise<any> {
    // Fetch the user's cart based on the userId
    const userCart = await this.cartModel.findOne({ userId });
    if (!userCart) {
      throw new Error('Cart not found');
    }

    // Extract necessary data from the cart items to create an order
    const makeOrderDto: makeOrderDto = {
      totalPrice: userCart.totalPrice,
      cartItems: userCart.cartItems,
    };

    // Call orders service to create the order
    await this.makeOrder(userId, makeOrderDto);
  }

  async makeOrder(userId: string, makeOrderDto: makeOrderDto) {
    const createdOrder = new this.ordersModel(makeOrderDto);
    createdOrder.userId = userId;
    return createdOrder.save();
  }

  async clearCart(userId: string): Promise<any> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.cartItems = []; // Remove all items from the cart
    cart.totalPrice = 0; // Reset total price
    cart.Subtotal = 0;
    cart.PromoCodeMultiplier = 1; // Reset promo code multiplier
    await cart.save();
    return { message: 'Cart cleared successfully' };
  }

  // async clearCart(userId: string): Promise<any> {
  //   const cart = await this.cartModel.findOne({ userId }).exec();
  //   if (!cart) {
  //     throw new Error('Cart not found');
  //   }

  //   cart.cartItems = []; // Remove all items from the cart
  //   cart.totalPrice = 0; // Reset total price
  //   cart.Subtotal = 0;
  //   cart.PromoCodeMultiplier = 1;
  //   cart.status = 'pending'
  //   await cart.save();
  //   return { message: 'Cart cleared successfully' };
  // }

  async getOrderHistory(userId: string) {
    const orders = await this.ordersModel.find({ userId }).exec();
    if (!orders) {
      throw new Error('No orders found');
    }
    return orders;
  }
}
