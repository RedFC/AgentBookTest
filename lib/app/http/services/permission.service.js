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
exports.PermissionService = void 0;
const permission_model_1 = require("../models/permission.model");
class PermissionService {
    constructor() { }
    createUserPermissions(permissionData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const permissions = permission_model_1.PermissionModel.insertMany(permissionData);
                resolve(permissions);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    getUserPermissions(userId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const permissions = permission_model_1.PermissionModel.findOne({ _id: userId });
                resolve(permissions);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map