"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheMiddleware = void 0;
const redis_service_1 = require("../../cache/redis.service");
class CacheMiddleware extends redis_service_1.RedisService {
    constructor() {
        super();
    }
}
exports.CacheMiddleware = CacheMiddleware;
//# sourceMappingURL=cache.js.map