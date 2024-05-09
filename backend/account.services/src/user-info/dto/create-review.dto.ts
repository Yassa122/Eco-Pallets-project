import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsNotEmpty()
    @IsString()
    comment: string;
}
