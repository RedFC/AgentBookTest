"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.AccountsRouter = express_1.default.Router();
const accounts_controller_1 = require("./accounts.controller");
let accounts_controller = new accounts_controller_1.AccountsController();
exports.AccountsRouter.post('/', accounts_controller.account_data_by_id);
//# sourceMappingURL=index.js.map