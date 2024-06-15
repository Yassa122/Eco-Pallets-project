import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://Admin:98pE-8FZADg8bbZ@eco-pallets.saefewe.mongodb.net/plastic-pallets-home?retryWrites=true&w=majority&appName=Eco-Pallets'), // Updated database name
  },
];
