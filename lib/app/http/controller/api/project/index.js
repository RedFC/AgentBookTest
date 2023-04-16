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
const role_1 = require("../../../middleware/role");
const validation_1 = require("../../../middleware/validation");
let projectController = new project_controller_1.ProjectController();
let authMiddleware = new auth_1.AuthenticationMiddleware();
let roleMiddleware = new role_1.RoleMiddleware();
let validationMiddleware = new validation_1.ValidationMiddleware();
exports.PorjectRouter.post("/", authMiddleware.isAuthenticated(), roleMiddleware.isAdmin(), validationMiddleware.validateProject(), projectController.create);
exports.PorjectRouter.get("/", authMiddleware.isAuthenticated(), roleMiddleware.isUser(), projectController.read);
exports.PorjectRouter.get("/:id", authMiddleware.isAuthenticated(), roleMiddleware.isUser(), validationMiddleware.validateProjectExist(), projectController.readOne);
exports.PorjectRouter.put("/:id", authMiddleware.isAuthenticated(), roleMiddleware.isAdmin(), validationMiddleware.validateProject(), validationMiddleware.validateProjectExist(), projectController.update);
exports.PorjectRouter.delete("/:id", authMiddleware.isAuthenticated(), roleMiddleware.isAdmin(), validationMiddleware.validateProjectExist(), projectController.delete);
//# sourceMappingURL=index.js.map