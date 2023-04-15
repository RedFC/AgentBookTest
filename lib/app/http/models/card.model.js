"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
let CardSchema = new mongoose_1.default.Schema({
    name: String,
    priority: { type: String, enum: ['low', 'high', 'urgent'] },
    type: { type: String, enum: ['backlog', 'todo', 'inprocess', 'inreview', 'completed'] },
    assignee: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
    description: String,
    project: { type: mongoose_1.Schema.Types.ObjectId, ref: 'project' }
});
exports.CardModel = mongoose_1.default.model('card', CardSchema);
//# sourceMappingURL=card.model.js.map