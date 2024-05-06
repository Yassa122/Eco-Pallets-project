import { Connection } from 'mongoose';
import { ReviewSchema } from '../schemas/review.schema';

export const reviewProviders = [
  {
    provide: 'REVIEW_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Review', ReviewSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
