import { IsString } from 'class-validator';

export class DeleteShippingAddressDto {
  @IsString()
  _id: string; // Use string type to match the method signature
}
