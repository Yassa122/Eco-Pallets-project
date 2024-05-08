// shipping-address.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class ShippingAddressDto {
    @IsNotEmpty()
    @IsString()
    label: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @IsNotEmpty()
    @IsString()
    country: string;
}

export class CreateShippingAddressDto extends ShippingAddressDto {}

export class UpdateShippingAddressesDto {
    @IsNotEmpty()
    addresses: ShippingAddressDto[];
}
