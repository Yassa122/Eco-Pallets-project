import { ProductService } from './product/product.service';
import { CreateProductDto } from './product/dto/create-product.dto';
export declare class AppService {
    private readonly productService;
    private createProductDto;
    constructor(productService: ProductService, createProductDto: CreateProductDto);
    getHello(): string;
    create(createIdentityDto: CreateProductDto): Promise<any>;
}
