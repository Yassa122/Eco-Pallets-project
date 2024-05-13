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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(productModel, reviewModel, wishlistModel) {
        this.productModel = productModel;
        this.reviewModel = reviewModel;
        this.wishlistModel = wishlistModel;
    }
    async createProduct(createProductDto) {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }
    async findAllProducts() {
        try {
            const products = await this.productModel.find().exec();
            if (!products || products.length === 0) {
                throw new common_1.NotFoundException('No products found');
            }
            return products;
        }
        catch (error) {
            console.error('Error retrieving all products', error);
            throw error;
        }
    }
    async findById(id) {
        try {
            console.log(`Finding product with ID: ${id}`);
            const product = await this.productModel.findById(id).exec();
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return product;
        }
        catch (error) {
            console.error(`Error finding product with ID: ${id}`, error.stack);
            throw error;
        }
    }
    async addReview(productId, userId, createReviewDto) {
        const review = new this.reviewModel({
            productId: productId,
            userId: userId,
            ...createReviewDto,
        });
        return review.save();
    }
    async viewReviews(productId) {
        return this.reviewModel.find({ productId }).exec();
    }
    async deleteReview(id, userId) {
        const review = await this.reviewModel.findById(id).exec();
        console.log('Found review:', review);
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        if (review.userId !== userId) {
            throw new common_1.UnauthorizedException('You are not authorized to delete this review');
        }
        await this.reviewModel.findByIdAndDelete(id).exec();
    }
    async addToWishlist(createWishlistDto) {
        const newWishlistItem = new this.wishlistModel(createWishlistDto);
        return newWishlistItem.save();
    }
    async removeFromWishlist(productId) {
        return this.wishlistModel.findOneAndDelete({ productId }).exec();
    }
    async customizeProduct(productId, customizationDto) {
        const product = await this.productModel.findById(productId).exec();
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        product.color = customizationDto.color;
        product.size = customizationDto.size;
        product.material = customizationDto.material;
        return product.save();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('Review')),
    __param(2, (0, mongoose_1.InjectModel)('Wishlist')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map