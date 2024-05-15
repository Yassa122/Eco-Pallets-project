"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product/product.service");
const create_product_dto_1 = require("./product/dto/create-product.dto");
let AppService = class AppService {
    constructor(productService, createProductDto) {
        this.productService = productService;
        this.createProductDto = createProductDto;
    }
    getHello() {
        return 'Hello World!';
    }
    async create(createIdentityDto) {
        return this.productService.createProduct(createIdentityDto);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        create_product_dto_1.CreateProductDto])
], AppService);
//# sourceMappingURL=app.service.js.map