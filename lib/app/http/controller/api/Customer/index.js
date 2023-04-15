"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.CustomerRouter = express_1.default.Router();
const user_controller_1 = require("./user.controller");
let userController = new user_controller_1.UserController();
exports.CustomerRouter.post('/register', userController.register);
//# sourceMappingURL=index.js.map