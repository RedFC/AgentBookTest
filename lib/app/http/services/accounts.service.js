"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const transaction_model_1 = require("../models/transaction.model");
class AccountService {
    constructor() { }
    transaction_aggregate(data) {
        return new Promise((resolve, reject) => {
            transaction_model_1.TransactionModel.aggregate([
                {
                    $match: { $expr: { $eq: ["$account_id", data.id] } }
                },
                {
                    $unwind: "$transactions"
                },
                {
                    "$group": {
                        "_id": "$account_id",
                        "total_amount_bought": {
                            "$sum": {
                                "$cond": [
                                    { "$eq": ["$transactions.transaction_code", "buy"] },
                                    "$transactions.amount",
                                    0
                                ]
                            }
                        },
                        "total_amount_sold": {
                            "$sum": {
                                "$cond": [
                                    { "$eq": ["$transactions.transaction_code", "sell"] },
                                    "$transactions.amount",
                                    0
                                ]
                            }
                        }
                    }
                }
            ]).then(data => {
                resolve(data[0]);
            }).catch(error => {
                reject(error);
            });
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=accounts.service.js.map