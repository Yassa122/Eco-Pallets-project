export class CreateProductDto {
     name: string;
     description: string;
     images: string[];
     price: number;
     availability: boolean;
     specifications: string[];
     rentalOptions?: {
      available: boolean;
      duration?: number;
      price?: number;
    };
  }