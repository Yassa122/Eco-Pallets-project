"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistProviders = void 0;
const wishlist_schema_1 = require("../schemas/wishlist.schema");
exports.wishlistProviders = [
    {
        provide: 'WISHLIST_MODEL',
        useFactory: (connection) => connection.model('Wishlist', wishlist_schema_1.WishlistSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=wishlist.provider.js.map