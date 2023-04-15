"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let AccountSchema = new mongoose_1.default.Schema({
    'account_id': Number,
    'limit': Number,
    'products': [String]
});
const AccountModel = mongoose_1.default.model('accounts', AccountSchema);
exports.AccountModel = AccountModel;
//# sourceMappingURL=account.model.js.map