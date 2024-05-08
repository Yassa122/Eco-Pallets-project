import { IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class OrderItemDTO {
    @IsNotEmpty()
    itemId: Types.ObjectId;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
