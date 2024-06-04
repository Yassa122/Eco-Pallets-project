import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CreateWishlistDto } from './dto/wishlist.dto';
import { CustomizationDto } from './dto/customization.dto';
import { RentProductDto } from './dto/rent-product.dto';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
import { ProductWishlistDto } from './dto/product-wishlist.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    getAllProducts(): Promise<CreateProductDto[]>;
    getProductById(id: string): Promise<Product>;
    addReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    getProductReviews(productId: string): Promise<Review[]>;
    viewProductDetails(id: string): Promise<Product>;
    viewReviews(productId: string): Promise<Review[]>;
    addToWishlist(productId: string, userId: string, createWishlistDto: CreateWishlistDto): Promise<Wishlist>;
    rentProduct(productId: string, rentProductDto: RentProductDto): Promise<{
        success: boolean;
        rentalDetails: any;
    }>;
    deleteReview(id: string, userId: string): Promise<any>;
    getWishlist(userId: string): Promise<Wishlist>;
    addProduct(addProductDto: ProductWishlistDto, userId: string): Promise<Wishlist>;
    removeProduct(removeProductDto: ProductWishlistDto, userId: string): Promise<Wishlist>;
    customizeProduct(productId: string, customizationDto: CustomizationDto): Promise<Product>;
}
