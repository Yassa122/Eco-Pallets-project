import { AppService } from './app.service';
import { ProductService } from './product/product.service';
export declare class AppController {
    private readonly appService;
    private readonly productService;
    constructor(appService: AppService, productService: ProductService);
    getAllProducts(): Promise<import("./product/interfaces/product").Product[]>;
    create(reqBody: any): Promise<any>;
}
