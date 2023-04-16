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
exports.ForgotService = void 0;
const forgot_model_1 = require("../models/forgot.model");
class ForgotService {
    create(forgotData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const forgot = forgot_model_1.ForgotModel.create(forgotData);
                resolve(forgot);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    findOne(otp) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const forgot = forgot_model_1.ForgotModel.findOne({ otp: otp });
                resolve(forgot);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    delete(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const forgot = forgot_model_1.ForgotModel.findOneAndDelete({ _id: id });
                resolve(forgot);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.ForgotService = ForgotService;
//# sourceMappingURL=forgot.service.js.map