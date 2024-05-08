import {
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsDefined()
  images: string[];

  @IsNumber()
  @IsDefined()
  price: number;

  @IsBoolean()
  @IsDefined()
  availability: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional() // Make specifications optional
  specifications?: string[];

  @IsOptional()
  @ValidateNested() // Ensures nested object validations
  @Type(() => RentalOptions)
  rentalOptions?: RentalOptions;
}
