"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const account_model_1 = require("../models/account.model");
class AccountService {
    constructor() { }
    aggregate(data) {
        return new Promise((resolve, reject) => {
            account_model_1.AccountModel.aggregate([
                {
                    $match: { $expr: { $eq: ["$status", "PUBLISHED"] } }
                },
                {
                    $lookup: {}
                }
            ]);
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map