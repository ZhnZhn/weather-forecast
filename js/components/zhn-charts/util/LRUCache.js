"use strict";

exports.__esModule = true;
exports.crLRUCache = void 0;
/**
 * Simple LRU (Least Recently Used) cache implementation
 */

const crLRUCache = maxSize => {
  const cache = new Map();
  return {
    get: key => {
      const value = cache.get(key);
      if (value !== undefined) {
        cache.delete(key);
        cache.set(key, value);
      }
      return value;
    },
    set: (key, value) => {
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= maxSize) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      cache.set(key, value);
    },
    clear: () => {
      cache.clear();
    },
    size: () => cache.size
  };
};
exports.crLRUCache = crLRUCache;
//# sourceMappingURL=LRUCache.js.map