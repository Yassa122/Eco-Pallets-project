import { IsUUID, IsOptional, ValidateNested, IsString, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { ShippingAddressDto } from './shipping-address.dto';

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
  @IsString()
  public phoneNumber?: string;


  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ShippingAddressDto)
  public shippingAddresses?: ShippingAddressDto[];


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
