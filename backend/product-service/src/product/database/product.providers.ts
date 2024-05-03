import { Connection } from 'mongoose';
import { ProductSchema } from '../schemas/product.schema'; // Adjust the import path

export const productProviders = [
  {
    provide: 'PRODUCT_MODEL', // Provide a token for injection
    useFactory: (connection: Connection) =>
      connection.model('Product', ProductSchema), // Use the Product schema to create the model
    inject: ['DATABASE_CONNECTION'], // Inject the database connection token
  },
];
