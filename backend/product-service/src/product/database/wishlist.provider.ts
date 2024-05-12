import { Connection } from 'mongoose';
import { WishlistSchema } from '../schemas/wishlist.schema';

export const wishlistProviders = [
  {
    provide: 'WISHLIST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Wishlist', WishlistSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
