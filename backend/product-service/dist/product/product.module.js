"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const product_schema_1 = require("./schemas/product.schema");
const review_schema_1 = require("./schemas/review.schema");
const wishlist_schema_1 = require("./schemas/wishlist.schema");
const product_providers_1 = require("./database/product.providers");
const database_providers_1 = require("./database/database.providers");
const rentals_schema_1 = require("./schemas/rentals.schema");
let ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Product', schema: product_schema_1.ProductSchema },
                { name: 'Review', schema: review_schema_1.ReviewSchema }, { name: "Wishlist", schema: wishlist_schema_1.WishlistSchema },
                { name: 'Rentals', schema: rentals_schema_1.RentalSchema },
            ])],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, ...database_providers_1.databaseProviders, ...product_providers_1.productProviders],
        exports: [product_service_1.ProductService, mongoose_1.MongooseModule],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map