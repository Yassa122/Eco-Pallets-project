import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  images: string[];

  @IsNumber()
  price: number;

  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsString()
  material: string;

  @IsBoolean()
  availability: boolean;

  @IsOptional()
  @IsArray()
  rentalOptions?: {
    available: boolean;
    duration?: number;
    price?: number;
  }[];
}
