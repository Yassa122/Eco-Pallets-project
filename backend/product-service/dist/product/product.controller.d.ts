import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { CustomizationDto } from './dto/customization.dto';
import { RentProductDto } from './dto/rent-product.dto';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    getAllProducts(): Promise<CreateProductDto[]>;
    getProductById(id: string): Promise<Product>;
    addReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    getProductReviews(productId: string): Promise<Review[]>;
    deleteReview(id: string, userId: string): Promise<void>;
    addToWishlist(productId: string, userId: string, createWishlistDto: CreateWishlistDto): Promise<Wishlist>;
    getWishlistByUser(userId: string): Promise<Wishlist[]>;
    removeFromWishlist(productId: string): Promise<Wishlist | null>;
    customizeProduct(productId: string, customizationDto: CustomizationDto): Promise<Product>;
    rentProduct(productId: string, rentProductDto: RentProductDto): Promise<{
        success: boolean;
        rentalDetails: any;
    }>;
}
