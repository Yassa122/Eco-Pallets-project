import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateWishlistDto {
  productId: string;
  userId: string;
}
   