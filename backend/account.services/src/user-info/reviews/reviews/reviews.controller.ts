import { Controller, Get, Post, Put, Delete, Body, Param, Request } from '@nestjs/common';
import { ReviewsService } from '../reviews/reviews.service';
import { CreateReviewDto} from '../../dto/create-review.dto';
import { UpdateReviewDto } from 'src/user-info/dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Get()
  getUserReviews(@Request() req): Promise<any> {
    return this.reviewService.findUserReviews(req.user.id);
  }

  @Post()
  createReview(@Request() req, @Body() createReviewDto: CreateReviewDto): Promise<any> {
    return this.reviewService.createReview(req.user.id, createReviewDto);
  }

  @Put(':id')
  updateReview(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto): Promise<any> {
    return this.reviewService.updateReview(id, updateReviewDto);
  }

  @Delete(':id')
  deleteReview(@Param('id') id: string): Promise<any> {
    return this.reviewService.deleteReview(id);
  }
}
