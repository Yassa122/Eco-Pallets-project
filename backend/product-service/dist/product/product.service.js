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
    constructor(productModel, reviewModel, wishlistModel, rentalModel) {
        this.productModel = productModel;
        this.reviewModel = reviewModel;
        this.wishlistModel = wishlistModel;
        this.rentalModel = rentalModel;
    }
    async createProduct(createProductDto) {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }
    async getAllProducts() {
        const products = this.productModel.find().exec();
        console.log("fetch", products);
        return (products);
    }
    async getProductById(id) {
        console.log(id);
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async addReview(productId, userId, createReviewDto) {
        console.log(createReviewDto);
        const review = new this.reviewModel({
            productId,
            userId,
            rating: createReviewDto.rating,
            comment: createReviewDto.comment,
        });
        return review.save();
    }
    async getProductReviews(productId) {
        const reviews = await this.reviewModel.find({ productId }).exec();
        console.log(productId);
        console.log(reviews);
        if (!reviews) {
            throw new common_1.NotFoundException('No reviews found for this product');
        }
        return reviews;
    }
    async deleteReview(id, userId) {
        const review = await this.reviewModel.findById(id).exec();
        console.log('Found review:', review);
        if (!review) {
            throw new common_1.NotFoundException('Review not found');
        }
        await this.reviewModel.findByIdAndDelete(id).exec();
    }
    async addToWishlist(createWishlistDto) {
        const newWishlistItem = new this.wishlistModel(createWishlistDto);
        return newWishlistItem.save();
    }
    async getWishlistByUser(userId) {
        return this.wishlistModel.find({ userId }).populate('productId').exec();
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
    async rentProduct(productId, rentProductDto) {
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const { rentalStart, rentalEnd, deposit } = rentProductDto;
        const startDate = new Date(rentalStart);
        const endDate = new Date(rentalEnd);
        const rentalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        if (rentalDays <= 0) {
            throw new Error('Invalid rental period');
        }
        const totalPrice = (rentalDays) * deposit;
        console.log("here");
        console.log("1", rentalDays);
        console.log("3", deposit);
        const rentalRecord = new this.rentalModel({
            productId,
            rentalStart,
            rentalEnd,
            rentalDays,
            deposit,
            totalPrice,
        });
        console.log(rentalRecord);
        await rentalRecord.save();
        return {
            productId,
            rentalStart,
            rentalEnd,
            rentalDays,
            deposit: deposit,
            totalPrice,
        };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __param(1, (0, mongoose_1.InjectModel)('Review')),
    __param(2, (0, mongoose_1.InjectModel)('Wishlist')),
    __param(3, (0, mongoose_1.InjectModel)('Rentals')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map