import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateReviewDto} from '../../dto/create-review.dto';
import { UpdateReviewDto } from 'src/user-info/dto/update-review.dto';
import { CreateProductDto } from 'src/user-info/dto/create-product.dto';
import { JwtAuthGuard } from 'src/identity/strategies/jwt-auth.guard';
import { UserReviewsDto } from 'src/user-info/dto/get-reviews.dto';


@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('create-prod')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.reviewService.createProduct(createProductDto);
  }

  @Get('user-reviews/:userId')
  @UseGuards(JwtAuthGuard)
  async getUserReviews(@Param('userId') userId: string): Promise<UserReviewsDto[]> {
  return this.reviewService.findUserReviews(userId);
}

  // @Get('myreviews')
  // @UseGuards(JwtAuthGuard)  // Ensure that this route is protected and that req.user is populated
  // async getUserReviews(@Request() req): Promise<any> {
  //   return await this.reviewService.findUserReviews(req.user._id.toString());
  // }

  @Post('addreview/:id')
async addReview(
  @Param('id') productId: string,
  @Query('userId') userId: string,
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
