"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.viewsRouter = express_1.default.Router();
const views_controller_1 = require("./views.controller");
let views_controller = new views_controller_1.Views();
exports.viewsRouter.get('/', views_controller.index);
exports.viewsRouter.get('/login', views_controller.login);
exports.viewsRouter.get('/*', views_controller.not_found);
//# sourceMappingURL=index.js.map