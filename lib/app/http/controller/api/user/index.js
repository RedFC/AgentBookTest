"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.UserRouter = express_1.default.Router();
const user_controller_1 = require("./user.controller");
const validation_1 = require("../../../middleware/validation");
const auth_1 = require("../../../middleware/auth");
let userController = new user_controller_1.UserController();
let validationMiddleware = new validation_1.ValidationMiddleware();
let authMiddleware = new auth_1.AuthenticationMiddleware();
exports.UserRouter.post('/register', validationMiddleware.validateRegisterData(), userController.signup);
exports.UserRouter.post('/login', validationMiddleware.validateUserLogin(), userController.login);
exports.UserRouter.get('/me', authMiddleware.isAuthenticated(), userController.me);
exports.UserRouter.post('/forgot', validationMiddleware.validateUserForgotPasswordReset(), userController.forgotPassword);
exports.UserRouter.post('/reset', validationMiddleware.validateUserPasswordReset(), userController.resetPassword);
//# sourceMappingURL=index.js.map