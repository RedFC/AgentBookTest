"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const validate_1 = require("../controller/validate");
class ValidationMiddleware extends validate_1.Validator {
    constructor() {
        super();
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.js.map