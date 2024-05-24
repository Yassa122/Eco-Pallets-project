// dto/user-reviews.dto.ts

export class UserReviewsDto {
    reviewId:string;
    productId: string;
    productName: string;
    productDescription: string;
    productImages: string[]; // Array of images
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  