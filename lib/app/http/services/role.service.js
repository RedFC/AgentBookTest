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
exports.RoleService = void 0;
const role_model_1 = require("../models/role.model");
class RoleService {
    constructor() { }
    findCount() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = role_model_1.RoleModel.countDocuments();
                resolve(role);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    ;
    createRole(roleData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = role_model_1.RoleModel.create(roleData);
                resolve(role);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    ;
    createManyRole(roleData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = role_model_1.RoleModel.insertMany(roleData);
                resolve(role);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    ;
    findRole(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const role = role_model_1.RoleModel.findOne({ _id: id });
                resolve(role);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    ;
}
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map