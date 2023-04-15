"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsController = void 0;
const accounts_service_1 = require("../../../services/accounts.service");
class AccountsController {
    account_data_by_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let accountService = new accounts_service_1.AccountService();
                let data = yield accountService.transaction_aggregate({ id: parseInt(req.body.account_id) });
                delete data['_id'];
                return res.send(data);
            }
            catch (error) {
                return res.send(error);
            }
        });
    }
}
exports.AccountsController = AccountsController;
//# sourceMappingURL=accounts.controller.js.map