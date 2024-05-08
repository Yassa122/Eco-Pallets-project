import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      console.log('Connecting to MongoDB...');
      return await mongoose.connect('mongodb://127.0.0.1:27017/plastic-pallets');
    },
  }
];
