import compose from "composable-middleware";
import { RedisService } from "../../cache/redis.service";
import * as _ from "lodash";
export class CacheMiddleware extends RedisService {
    constructor() {
        super();
    }
}