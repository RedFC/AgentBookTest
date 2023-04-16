"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const composable_middleware_1 = __importDefault(require("composable-middleware"));
const validate_1 = require("../controller/validate");
const response_service_1 = require("../services/response.service");
const card_service_1 = require("../services/card.service");
const project_service_1 = require("../services/project.service");
let responseService = new response_service_1.ResponseService();
let cardService = new card_service_1.CardService();
let projectService = new project_service_1.ProjectService();
class ValidationMiddleware extends validate_1.Validator {
    constructor() {
        super();
    }
    // USER
    validateRegisterData() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            super.validateRegisterData(req.body)
                .then(data => {
                next();
            }).catch(error => {
                return responseService.reject({
                    code: 400,
                    status: false,
                    message: error.details[0].message
                }, res);
            });
        }));
    }
    validateUserLogin() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            super.validateUserLogin(req.body)
                .then(data => {
                next();
            }).catch(error => {
                return responseService.reject({
                    code: 400,
                    status: false,
                    message: error.details[0].message
                }, res);
            });
        }));
    }
    validateUserForgotPasswordReset() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            super.validateUserForgotPasswordReset(req.body)
                .then(data => {
                next();
            }).catch(error => {
                return responseService.reject({
                    code: 400,
                    status: false,
                    message: error.details[0].message
                }, res);
            });
        }));
    }
    validateUserPasswordReset() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            super.validateUserPasswordReset(req.body)
                .then(data => {
                next();
            }).catch(error => {
                return responseService.reject({
                    code: 400,
                    status: false,
                    message: error.details[0].message
                }, res);
            });
        }));
    }
    // PROJECT
    validateProjectExist() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            projectService.readOne(req.params.id)
                .then(data => {
                if (!data) {
                    return responseService.reject({
                        code: 404,
                        status: false,
                        message: "Project Not Found"
                    }, res);
                }
                next();
            }).catch(err => {
                return responseService.reject({
                    code: 400,
                    status: false,
                    message: err.message
                }, res);
            });
        }));
    }
    validateProject() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            super.validateProject(req.body)
                .then(data => {
                next();
            }).catch(error => {
                return responseService.reject({
                    code: 400,
                    status: false,
                    message: error.details[0].message
                }, res);
            });
        }));
    }
    // CARD
    validateCardExist() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            cardService.findOne(req.params.id)
                .then(data => {
                if (!data) {
                    return responseService.reject({
                        code: 404,
                        status: false,
                        message: "Card Not Found"
                    }, res);
                }
                next();
            }).catch(err => {
                return responseService.reject({
                    code: 400,
                    status: false,
                    message: err.message
                }, res);
            });
        }));
    }
    validateCard() {
        return (composable_middleware_1.default()
            .use((req, res, next) => {
            super.validateCard(req.body)
                .then(data => {
                next();
            }).catch(error => {
                return responseService.reject({
                    code: 400,
                    status: false,
                    message: error.details[0].message
                }, res);
            });
        }));
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validation.js.map