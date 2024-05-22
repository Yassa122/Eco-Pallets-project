// dto/rent-product.dto.ts
import { IsDateString, IsNotEmpty, IsMongoId } from 'class-validator';

export class RentProductDto {

  @IsDateString()
  @IsNotEmpty()
  rentalStart: Date;

  @IsDateString()
  @IsNotEmpty()
  rentalEnd: Date;

  @IsNotEmpty()
  deposit:number;
}
