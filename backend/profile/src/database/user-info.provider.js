"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProviders = void 0;
var user_schema_1 = require("../schemas/user.schema");
exports.orderProviders = [
    {
        provide: 'USER_MODEL',
        useFactory: function (connection) { return connection.model('User', user_schema_1.UserSchema); },
        inject: ['DATABASE_CONNECTION'],
    },
];
