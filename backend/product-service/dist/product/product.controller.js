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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const create_review_dto_1 = require("./dto/create.review.dto");
const wishlist_dto_1 = require("./dto/wishlist.dto");
const customization_dto_1 = require("./dto/customization.dto");
const rent_product_dto_1 = require("./dto/rent-product.dto");
const current_user_decorator_1 = require("../decorators/current-user.decorator");
const product_wishlist_dto_1 = require("./dto/product-wishlist.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(createProductDto) {
        return this.productService.createProduct(createProductDto);
    }
    async getAllProducts() {
        try {
            const products = await this.productService.getAllProducts();
            if (!products || products.length === 0) {
                throw new common_1.NotFoundException('No products found');
            }
            return products;
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to fetch products: ' + error.message);
        }
    }
    async getProductById(id) {
        return this.productService.viewProductDetails(id);
    }
    async addReview(productId, userId, createReviewDto) {
        return this.productService.addReview(productId, userId, createReviewDto);
    }
    async getProductReviews(productId) {
        console.log(productId);
        return this.productService.getProductReviews(productId);
        console.log(productId);
    }
    async viewProductDetails(id) {
        console.log(id);
        return this.productService.findById(id);
    }
    async viewReviews(productId) {
        return this.productService.viewReviews(productId);
    }
    async addToWishlist(productId, userId, createWishlistDto) {
        return this.productService.addToWishlist({
            ...createWishlistDto,
            productId,
            userId
        });
    }
    async rentProduct(productId, rentProductDto) {
        try {
            const rentalDetails = await this.productService.rentProduct(productId, rentProductDto);
            return { success: true, rentalDetails };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            else {
                throw new common_1.NotFoundException('Failed to rent product: ' + error.message);
            }
        }
    }
    async deleteReview(id, userId) {
        return this.productService.deleteReview(id, userId);
    }
    getWishlist(userId) {
        return this.productService.findWishlistByUserId(userId);
    }
    addProduct(addProductDto, userId) {
        return this.productService.addProductToWishlist(userId, addProductDto);
    }
    removeProduct(removeProductDto, userId) {
        return this.productService.removeProductFromWishlist(userId, removeProductDto);
    }
    async customizeProduct(productId, customizationDto) {
        return this.productService.customizeProduct(productId, customizationDto);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('/getAllProducts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)('/productdetails/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, common_1.Post)(':productId/addreview'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addReview", null);
__decorate([
    (0, common_1.Get)('/reviews/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductReviews", null);
__decorate([
    (0, common_1.Get)('/getProductById/:id'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "viewProductDetails", null);
__decorate([
    (0, common_1.Get)(':id/reviews'),
    __param(0, (0, common_1.Param)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "viewReviews", null);
__decorate([
    (0, common_1.Post)(':id/wishlist'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, wishlist_dto_1.CreateWishlistDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addToWishlist", null);
__decorate([
    (0, common_1.Post)(':productId/rent'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, rent_product_dto_1.RentProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "rentProduct", null);
__decorate([
    (0, common_1.Delete)('reviews/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Get)('my-wishlist'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "getWishlist", null);
__decorate([
    (0, common_1.Post)('add-to-wishlist'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_wishlist_dto_1.ProductWishlistDto, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Delete)('remove-from-wishlist'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_wishlist_dto_1.ProductWishlistDto, String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "removeProduct", null);
__decorate([
    (0, common_1.Put)(':productId/customize'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, customization_dto_1.CustomizationDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "customizeProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map