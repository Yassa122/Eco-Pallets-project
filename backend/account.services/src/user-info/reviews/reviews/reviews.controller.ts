import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards, HttpException, HttpStatus, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { UpdateReviewDto } from 'src/user-info/dto/update-review.dto';
import { CreateProductDto } from 'src/user-info/dto/create-product.dto';
import { JwtAuthGuard } from 'src/identity/strategies/jwt-auth.guard';
import { UserReviewsDto } from 'src/user-info/dto/get-reviews.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { join } from 'path';
import { mkdir, writeFile } from 'fs/promises'; // Correct import
import { FilesInterceptor, AnyFilesInterceptor as NestAnyFilesInterceptor } from '@nestjs/platform-express'; // Rename import
import { Express } from 'express';
import { Product } from 'src/user-info/interfaces/product';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('create-prod')
  @UseInterceptors(FilesInterceptor('files')) // Use FilesInterceptor for multiple files
  async createProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto
  ) {
    // Handle file storage
    const uploadPath = join(__dirname, '..', '..', 'uploads');
    await mkdir(uploadPath, { recursive: true });

    const imagePaths = await Promise.all(files.map(async (file) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const filePath = join(uploadPath, filename);
      await writeFile(filePath, file.buffer);
      return `/uploads/${filename}`; // Return relative path to be used in the front-end
    }));

    createProductDto.images = imagePaths;

    return this.reviewService.createProduct(createProductDto);
  }
  @Get('products')
async getAllProducts(): Promise<Product[]> {
  return this.reviewService.getAllProducts();
}


  @Get('user-reviews')
  @UseGuards(JwtAuthGuard)
  async getUserReviews(@CurrentUser() userId: string): Promise<UserReviewsDto[]> {
    return this.reviewService.findUserReviews(userId);
  }

  @Post('add-review/:id')
  async addReview(
    @Param('id') productId: string,
    @CurrentUser() userId: string,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.reviewService.addReview(productId, userId, createReviewDto);
  }

  @Put('update-review/:id')
  updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<any> {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete('delete-review/:id')
  deleteReview(@Param('id') id: string): Promise<any> {
    return this.reviewService.deleteReview(id);
  }
}
