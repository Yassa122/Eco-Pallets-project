// src/identity/dtos/update-shipping-address.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateShippingAddressDto {
  @IsNotEmpty()
  _id: Types.ObjectId;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
