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
const kafka_service_1 = require("./kafka/kafka.service");
let ProductService = class ProductService {
    constructor(productModel, reviewModel, wishlistModel, rentalModel, kafkaService) {
        this.productModel = productModel;
        this.reviewModel = reviewModel;
        this.wishlistModel = wishlistModel;
        this.rentalModel = rentalModel;
        this.kafkaService = kafkaService;
    }
    async createProduct(createProductDto) {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }
    async viewProductDetails(id) {
        console.log(id);
        try {
            console.log(`Finding product with ID: ${id}`);
            const product = await this.productModel.findById(id).exec();
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return product;
        }
        catch (error) {
            console.error('Error finding product with ID: ${id}', error.stack);
            throw error;
        }
    }
    async getAllProducts() {
        const products = this.productModel.find().exec();
        console.log('fetch', products);
        return products;
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
        return { message: 'Review successfully deleted' };
    }
    async addToWishlist(createWishlistDto) {
        console.log(`Received request to add to wishlist: ${JSON.stringify(createWishlistDto)}`);
        const { userId, productId } = createWishlistDto;
        if (!mongoose_2.Types.ObjectId.isValid(productId)) {
            throw new common_1.BadRequestException(`Invalid product ID: ${productId}`);
        }
        const product = await this.productModel.findById(productId).exec();
        if (!product) {
            console.log(`Product with ID ${productId} not found`);
            throw new common_1.NotFoundException(`Product with ID ${productId} not found`);
        }
        let wishlist = await this.wishlistModel.findOne({ userId }).exec();
        if (!wishlist) {
            wishlist = new this.wishlistModel({ userId, products: [] });
            console.log(`Created new wishlist for user ID ${userId}`);
        }
        if (!Array.isArray(wishlist.products)) {
            wishlist.products = [];
        }
        const productExists = wishlist.products.some((item) => item.productId.equals(productId));
        if (productExists) {
            console.log(`Product with ID ${productId} is already in the wishlist`);
            throw new common_1.ConflictException(`Product with ID ${productId} is already in the wishlist`);
        }
        wishlist.products.push({
            productId: new mongoose_2.Types.ObjectId(productId),
            name: product.name,
            description: product.description,
            images: product.images,
            price: product.price,
            color: product.color,
            size: product.size,
            material: product.material,
            availability: product.availability,
            rentalOptions: product.rentalOptions,
        });
        const savedWishlist = await wishlist.save();
        console.log(`Product with ID ${productId} added to wishlist for user ID ${userId}`);
        try {
            await this.kafkaService.sendMessage('wishlist-add', {
                userId,
                productId,
            });
        }
        catch (error) {
            console.error('Failed to send message to Kafka:', error);
        }
        return savedWishlist;
    }
    async getWishlistByUser(userId) {
        console.log('Finding wishlist for User ID:', userId);
        return this.wishlistModel.find({ userId }).populate('productId').exec();
    }
    async removeFromWishlist(productId) {
        const removedItem = await this.wishlistModel
            .findOneAndDelete({ productId })
            .exec();
        await this.kafkaService.sendMessage('wishlist-remove', { productId });
        return removedItem;
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
        const totalPrice = rentalDays * deposit;
        const rentalRecord = new this.rentalModel({
            productId,
            rentalStart,
            rentalEnd,
            rentalDays,
            deposit,
            totalPrice,
        });
        await rentalRecord.save();
        return {
            productId,
            rentalStart,
            rentalEnd,
            rentalDays,
            deposit,
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
        mongoose_2.Model,
        kafka_service_1.KafkaService])
], ProductService);
//# sourceMappingURL=product.service.js.map