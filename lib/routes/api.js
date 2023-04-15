"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../app/http/controller/api/user");
const project_1 = require("../app/http/controller/api/project");
const card_1 = require("../app/http/controller/api/card");
const app = express_1.default();
app.use("/user", user_1.UserRouter);
app.use("/project", project_1.PorjectRouter);
app.use("/card", card_1.CardRouter);
module.exports = app;
//# sourceMappingURL=api.js.map