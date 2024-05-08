// shipping-address.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class ShippingAddressDto {
<<<<<<< HEAD
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
=======
    @IsNotEmpty()
    @IsString()
    label!: string; // Note the use of `!`

    @IsNotEmpty()
    @IsString()
    address!: string;

    @IsNotEmpty()
    @IsString()
    city!: string;

    @IsNotEmpty()
    @IsString()
    postalCode!: string;

    @IsNotEmpty()
    @IsString()
    country!: string;
}

export class CreateShippingAddressDto extends ShippingAddressDto {}

export class UpdateShippingAddressesDto {
    @IsNotEmpty()
    addresses!: ShippingAddressDto[]; // Note the use of `!`
>>>>>>> main
}
