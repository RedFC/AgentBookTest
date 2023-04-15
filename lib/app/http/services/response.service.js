"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
class ResponseService {
    success(data, response) {
        response.status(data.code).send(data);
    }
    successLogin(data, response) {
        response.status(data.code).send(data);
    }
    reject(data, response) {
        response.status(data.code).send(data);
    }
}
exports.ResponseService = ResponseService;
//# sourceMappingURL=response.service.js.map