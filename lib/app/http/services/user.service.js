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
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
class UserService {
    constructor() { }
    createUser(userData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = user_model_1.UserModel.create(userData);
                resolve(user);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    findUser(userData, attribute) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = attribute ? user_model_1.UserModel.findOne(userData).populate(attribute) : user_model_1.UserModel.findOne(userData);
                resolve(user);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    update(id, payload) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = user_model_1.UserModel.findOneAndUpdate({ _id: id }, payload, { new: true });
                resolve(user);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    patchPassword(id, password) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = user_model_1.UserModel.findOneAndUpdate({ _id: id }, { password: password }, { new: true });
                resolve(user);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map