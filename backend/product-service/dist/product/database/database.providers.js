"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => mongoose.connect('mongodb+srv://Admin:98pE-8FZADg8bbZ@eco-pallets.saefewe.mongodb.net/plastic-pallets-products?retryWrites=true&w=majority&appName=Eco-Pallets'),
    },
];
//# sourceMappingURL=database.providers.js.map