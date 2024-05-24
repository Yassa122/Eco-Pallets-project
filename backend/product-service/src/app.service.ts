import { Injectable } from '@nestjs/common';
import { ProductService } from './product/product.service'; // Import ProductService
import { CreateProductDto } from './product/dto/create-product.dto'; // Import CreateProductDto
@Injectable()
export class AppService {
  constructor(private readonly productService: ProductService,
    private createProductDto: CreateProductDto,
  ) {} // Inject ProductService

  getHello(): string {
    return 'Hello World!';
  }

  async create(createIdentityDto: CreateProductDto): Promise<any> {
    return this.productService.createProduct(createIdentityDto);
  }

  

}

