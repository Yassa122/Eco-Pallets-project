import { Connection } from 'mongoose';
// import { ProfileSchema } from '../schemas/profile.schema';  // Import ProfileSchema instead of ProfileInfo
import { UserSchema } from '../../../account.services/src/identity/schemas/user.schema';
export const identityProviders = [
  {
    provide: 'PROFILE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Profile', UserSchema),  
    inject: ['DATABASE_CONNECTION'],
  },
];
