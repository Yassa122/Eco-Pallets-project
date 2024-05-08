// src/identity/dtos/delete-shipping-address.dto.ts
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteShippingAddressDto {
  @IsNotEmpty()
  _id: Types.ObjectId;
}
