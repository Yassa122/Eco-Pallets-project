"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_module_1 = require("./product/product.module");
const mongoose_1 = require("@nestjs/mongoose");
const product_service_1 = require("./product/product.service");
const product_controller_1 = require("./product/product.controller");
const create_product_dto_1 = require("./product/dto/create-product.dto");
const product_schema_1 = require("./product/schemas/product.schema");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            product_module_1.ProductModule,
            mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/plastic-pallets-products'),
            mongoose_1.MongooseModule.forFeature([{ name: "Product", schema: product_schema_1.ProductSchema }]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            product_service_1.ProductService,
            create_product_dto_1.CreateProductDto,
            product_controller_1.ProductController,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map