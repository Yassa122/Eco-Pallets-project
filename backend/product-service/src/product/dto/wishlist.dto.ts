import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;
}
