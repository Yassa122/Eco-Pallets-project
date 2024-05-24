import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create.review.dto';
import { CustomizationDto } from './dto/customization.dto';
import { Product } from './interfaces/product';
import { Review } from './interfaces/review';
import { Wishlist } from './interfaces/wishlist';
import { ProductWishlistDto } from './dto/product-wishlist.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    viewProductDetails(id: string): Promise<Product>;
    addReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    viewReviews(productId: string): Promise<Review[]>;
    deleteReview(id: string, userId: string): Promise<void>;
    getWishlist(userId: string): Promise<Wishlist>;
    addProduct(addProductDto: ProductWishlistDto, userId: string): Promise<Wishlist>;
    removeProduct(removeProductDto: ProductWishlistDto, userId: string): Promise<Wishlist>;
    customizeProduct(productId: string, customizationDto: CustomizationDto): Promise<Product>;
}
