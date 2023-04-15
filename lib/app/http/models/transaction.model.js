"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let TransactionSchema = new mongoose_1.default.Schema({
    'Transaction_id': Number,
    'transaction_count': Number,
    'bucket_start_date': Date,
    'bucket_end_date': Date,
    'transactions': [{
            date: Date,
            amount: Number,
            transaction_code: String,
            symbol: String,
            price: String,
            total: String
        }]
});
const TransactionModel = mongoose_1.default.model('transactions', TransactionSchema);
exports.TransactionModel = TransactionModel;
//# sourceMappingURL=transaction.model.js.map