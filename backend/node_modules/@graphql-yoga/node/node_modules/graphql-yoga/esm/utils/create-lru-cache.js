import LRU from 'lru-cache';
const DEFAULT_MAX = 1024;
const DEFAULT_TTL = 3600000;
export function createLRUCache() {
    return new LRU({ max: DEFAULT_MAX, ttl: DEFAULT_TTL });
}
