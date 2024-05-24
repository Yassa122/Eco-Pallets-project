import {
    IsString,
    IsEmail,
    IsOptional,
    IsBoolean,
    MinLength,
    IsNotEmpty,
  } from 'class-validator';
  import mongoose from 'mongoose';
  
  export class CreateGuestIdentityDto {
    
    _id: mongoose.Types.ObjectId; // Change the type to Types.ObjectId

  
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
  
    @IsOptional()
    passwordResetExpires?: Date;
  
    @IsString()
    readonly role: string; // Add role field
  }
  