export declare class CreateProductDto {
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
