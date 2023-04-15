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
let cardController = new card_controller_1.CardController();
let authMiddleware = new auth_1.AuthenticationMiddleware();
exports.CardRouter.post('/', authMiddleware.isAuthenticated(), cardController.create);
exports.CardRouter.get('/', authMiddleware.isAuthenticated(), cardController.read);
exports.CardRouter.get('/:id', authMiddleware.isAuthenticated(), cardController.readOne);
exports.CardRouter.put('/:id', authMiddleware.isAuthenticated(), cardController.update);
exports.CardRouter.delete('/:id', authMiddleware.isAuthenticated(), cardController.delete);
//# sourceMappingURL=index.js.map