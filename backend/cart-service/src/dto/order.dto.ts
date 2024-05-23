import { Types } from 'mongoose';
import { CartItemDto } from './cartItem.dto';

export class makeOrderDto {
     cartItems: CartItemDto[];     
     totalPrice: number;
    toString(){
        return JSON.stringify({
            cartItems: this.cartItems,
            totalPrice: this.totalPrice,
        });
    }
}