'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const client_1 = require("@prisma/client");
const redis_service_1 = require("../../cache/redis.service");
class BaseService extends redis_service_1.RedisService {
    constructor(model) {
        super();
        this.prisma = new client_1.PrismaClient()[model];
    }
    create() {
        client_1.Prisma.Prisma__UserClient;
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map