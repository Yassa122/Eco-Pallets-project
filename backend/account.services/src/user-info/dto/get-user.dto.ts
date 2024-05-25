import { IsUUID, IsOptional, ValidateNested, IsString, IsEmail, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { AddShippingAddressDto } from './add-shipping-address.dto';

export class GetUserDto {
  @IsUUID()
  public readonly userId: string;

  @IsOptional()
  @IsString()
  public firstName?: string;

  @IsOptional()
  @IsString()
  public lastName?: string;


  @IsOptional()
  @IsBoolean()
  public isEmailVerified?: boolean;

  @IsOptional()
  @IsString()
  public phoneNumber?: string;


  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddShippingAddressDto)
  public shippingAddresses?: AddShippingAddressDto[];


  toString() {
    return JSON.stringify({
      userId: this.userId,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      shippingAddresses: this.shippingAddresses,
    });
  }
}
