import { Types } from 'mongoose';
import { CartItemDto } from './cartItem.dto';

export class CreateCartDto {
    readonly userId: Types.ObjectId;
    readonly cartItems: CartItemDto[];
    readonly totalPrice: number; // Added attribute
    readonly Subtotal: number; // Added attribute
    readonly PromoCodeMultiplier: number; // Added attribute
    readonly PromoCode: string; // Added attribute

    toString(){
        return JSON.stringify({
            userId:this.userId,
            cartItems: this.cartItems,
            totalPrice: this.totalPrice, // Include totalPrice in the output
            Subtotal: this.Subtotal, // Include Subtotal in the output
            PromoCodeMultiplier: this.PromoCodeMultiplier, // Include PromoCodeMultiplier in the output
            PromoCode: this.PromoCode, // Include PromoCode in the output
        });
    }
}