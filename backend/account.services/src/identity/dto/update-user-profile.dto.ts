import { IsString, IsOptional, IsEmail, Length, IsUUID } from 'class-validator';

export class UpdateUserProfile {
  @IsOptional()
  @IsString()
  @Length(2, 30)
  name?: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string; // Consider additional verification before updating emails

  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  contactInformation?: string;

  @IsUUID()
  userId: string;
}
