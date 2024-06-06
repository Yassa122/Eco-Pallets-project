import {
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsDefined,
} from 'class-validator';

// Define RentalOptions class first
class RentalOptions {
  @IsBoolean()
  available: boolean;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  price?: number;
}

// Then define CreateProductDto class
export class CreateProductDto {
  name: string;
  description: string;
  images: string[];
  price: number;
  color: string;
  size: string;
  material: string;
  availability: boolean;
  rentalOptions?: {
    available: boolean;
    duration?: number;
    price?: number;
  };
}
