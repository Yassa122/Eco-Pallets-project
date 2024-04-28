import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateIdentityDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsBoolean()
  @IsOptional()
  isEmailVerified?: boolean;

  @IsString()
  @IsOptional()
  passwordResetToken?: string;

  @IsOptional() // Custom date validator could be applied if needed
  passwordResetExpires?: Date;
}
