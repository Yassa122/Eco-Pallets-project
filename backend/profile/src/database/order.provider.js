"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderProviders = void 0;
var order_schema_1 = require("../schemas/order.schema");
exports.orderProviders = [
    {
        provide: 'ORDER_MODEL',
        useFactory: function (connection) { return connection.model('Order', order_schema_1.OrderSchema); },
        inject: ['DATABASE_CONNECTION'],
    },
];
