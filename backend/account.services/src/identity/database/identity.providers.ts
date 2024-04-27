import { Connection } from 'mongoose';
import { Identityschema } from './../schemas/identity.schema';

export const identityProviders = [
  {
    provide: 'IDENTITY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Identity', Identityschema),
    inject: ['DATABASE_CONNECTION'],
  },
];
