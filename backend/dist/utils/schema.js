"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nexus_1 = require("nexus");
const mutations_1 = __importDefault(require("../mutations"));
const types_1 = __importDefault(require("../types"));
const queries_1 = __importDefault(require("../queries"));
const schema = (0, nexus_1.makeSchema)({
    types: [types_1.default, queries_1.default, mutations_1.default],
});
exports.default = schema;
//# sourceMappingURL=schema.js.map