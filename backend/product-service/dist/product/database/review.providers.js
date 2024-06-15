"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewProviders = void 0;
const review_schema_1 = require("../schemas/review.schema");
exports.reviewProviders = [
    {
        provide: 'REVIEW_MODEL',
        useFactory: (connection) => connection.model('Review', review_schema_1.ReviewSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=review.providers.js.map