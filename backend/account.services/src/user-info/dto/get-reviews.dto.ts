// dto/user-reviews.dto.ts

export class UserReviewsDto {
    productId: string;
    productName: string;
    productDescription: string;
    rating: number;
    comment: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  