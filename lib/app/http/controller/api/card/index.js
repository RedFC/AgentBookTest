"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.CardRouter = express_1.default.Router();
const card_controller_1 = require("./card.controller");
const auth_1 = require("../../../middleware/auth");
const role_1 = require("../../../middleware/role");
const validation_1 = require("../../../middleware/validation");
let cardController = new card_controller_1.CardController();
let authMiddleware = new auth_1.AuthenticationMiddleware();
let roleMiddleware = new role_1.RoleMiddleware();
let validationMiddleware = new validation_1.ValidationMiddleware();
exports.CardRouter.post("/", authMiddleware.isAuthenticated(), roleMiddleware.isUser(), validationMiddleware.validateCard(), cardController.create);
exports.CardRouter.get("/", authMiddleware.isAuthenticated(), roleMiddleware.isUser(), cardController.read);
exports.CardRouter.get("/:id", authMiddleware.isAuthenticated(), roleMiddleware.isUser(), validationMiddleware.validateCardExist(), cardController.readOne);
exports.CardRouter.put("/:id", authMiddleware.isAuthenticated(), roleMiddleware.isUser(), validationMiddleware.validateCardExist(), cardController.update);
exports.CardRouter.delete("/:id", authMiddleware.isAuthenticated(), roleMiddleware.isUser(), validationMiddleware.validateCardExist(), cardController.delete);
//# sourceMappingURL=index.js.map