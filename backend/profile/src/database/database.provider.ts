import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
<<<<<<< HEAD
    useFactory: async () => {
      console.log('Connecting to MongoDB...');
      return await mongoose.connect('mongodb://127.0.0.1:27017/plastic-pallets');
    },
  }
=======
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://127.0.0.1:27017/plastic-pallet2'), // Updated database name
  },
>>>>>>> main
];
