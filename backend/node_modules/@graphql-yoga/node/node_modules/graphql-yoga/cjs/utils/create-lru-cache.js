"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLRUCache = void 0;
const tslib_1 = require("tslib");
const lru_cache_1 = tslib_1.__importDefault(require("lru-cache"));
const DEFAULT_MAX = 1024;
const DEFAULT_TTL = 3600000;
function createLRUCache() {
    return new lru_cache_1.default({ max: DEFAULT_MAX, ttl: DEFAULT_TTL });
}
exports.createLRUCache = createLRUCache;
