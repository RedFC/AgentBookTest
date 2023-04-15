"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorjectRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.PorjectRouter = express_1.default.Router();
const project_controller_1 = require("./project.controller");
const auth_1 = require("../../../middleware/auth");
let projectController = new project_controller_1.ProjectController();
let authMiddleware = new auth_1.AuthenticationMiddleware();
exports.PorjectRouter.post('/', authMiddleware.isAuthenticated(), projectController.create);
exports.PorjectRouter.get('/', authMiddleware.isAuthenticated(), projectController.read);
exports.PorjectRouter.get('/:id', authMiddleware.isAuthenticated(), projectController.readOne);
exports.PorjectRouter.put('/:id', authMiddleware.isAuthenticated(), projectController.update);
exports.PorjectRouter.delete('/:id', authMiddleware.isAuthenticated(), projectController.delete);
//# sourceMappingURL=index.js.map