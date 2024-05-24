/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
import { Rentals } from './interfaces/rentals';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { CustomizationDto } from './dto/customization.dto';
import { RentProductDto } from './dto/rent-product.dto';
export declare class ProductService {
    private readonly productModel;
    private readonly reviewModel;
    private readonly wishlistModel;
    private readonly rentalModel;
    constructor(productModel: Model<Product>, reviewModel: Model<Review>, wishlistModel: Model<Wishlist>, rentalModel: Model<Rentals>);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    getAllProducts(): Promise<CreateProductDto[]>;
    getProductById(id: string): Promise<Product>;
    addReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    getProductReviews(productId: string): Promise<Review[]>;
    deleteReview(id: string, userId: string): Promise<void>;
    addToWishlist(createWishlistDto: CreateWishlistDto): Promise<Wishlist>;
    getWishlistByUser(userId: string): Promise<Wishlist[]>;
    removeFromWishlist(productId: string): Promise<Wishlist | null>;
    customizeProduct(productId: string, customizationDto: CustomizationDto): Promise<Product>;
    rentProduct(productId: string, rentProductDto: RentProductDto): Promise<any>;
}
