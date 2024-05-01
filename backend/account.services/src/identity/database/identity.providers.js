"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identityProviders = void 0;
const identity_schema_1 = require("./../schemas/identity.schema");
exports.identityProviders = [
    {
        provide: 'IDENTITY_MODEL',
        useFactory: (connection) => connection.model('Identity', identity_schema_1.Identityschema),
        inject: ['DATABASE_CONNECTION'],
    },
];
