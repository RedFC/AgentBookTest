"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let BoardSchema = new mongoose_1.default.Schema({
    'username': String,
    'password': String,
    'name': String,
    'address': String,
    'birthdate': Date,
    'email': String,
    'active': Boolean
});
const BoardModel = mongoose_1.default.model('user', BoardSchema);
exports.BoardModel = BoardModel;
//# sourceMappingURL=board.model.js.map