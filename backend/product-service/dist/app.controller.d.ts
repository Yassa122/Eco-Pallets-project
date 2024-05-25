import { AppService } from './app.service';
import { ProductService } from './product/product.service';
export declare class AppController {
    private readonly appService;
    private readonly productService;
    constructor(appService: AppService, productService: ProductService);
    getAllProducts(): Promise<() => Promise<import("./product/dto/create-product.dto").CreateProductDto[]>>;
    create(reqBody: any): Promise<any>;
}
