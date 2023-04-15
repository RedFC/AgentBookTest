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
exports.customerController = void 0;
const customers_service_1 = require("../../../services/customers.service");
const accounts_service_1 = require("../../../services/accounts.service");
class customerController {
    constructor() {
    }
    customer_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let customerService = new customers_service_1.CustomerService();
                let data = yield customerService.customer_aggregate({ username: "fmiller" });
                return res.send(data);
            }
            catch (error) {
                return res.send(error);
            }
        });
    }
    account_data(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let accountService = new accounts_service_1.AccountService();
                let data = yield accountService.transaction_aggregate({ id: 443178 });
                delete data[0]['_id'];
                return res.send(data[0]);
            }
            catch (error) {
                return res.send(error);
            }
        });
    }
}
exports.customerController = customerController;
//# sourceMappingURL=user.controller.js.map