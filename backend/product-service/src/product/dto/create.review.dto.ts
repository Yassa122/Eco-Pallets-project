import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
