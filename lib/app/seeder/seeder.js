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
exports.Seeder = void 0;
const mongoose_1 = require("mongoose");
const role_service_1 = require("../http/services/role.service");
const user_service_1 = require("../http/services/user.service");
const permission_service_1 = require("../http/services/permission.service");
let roleService = new role_service_1.RoleService();
let userService = new user_service_1.UserService();
let permissionService = new permission_service_1.PermissionService();
class Seeder {
    createRole() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getCount = yield roleService.findCount();
                if (getCount != 2) {
                    let roleObject = [
                        { name: "Admin" },
                        { name: "User" },
                    ];
                    let createManyRole = yield roleService.createManyRole(roleObject);
                    console.log(createManyRole);
                }
                return;
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let object = {
                    username: "Admin", password: "admin12345", name: "admin", address: "admin space", email: "admin@admin.com", active: true, role: mongoose_1.Types.ObjectId('64394c7674e2381b8c99d815')
                };
                let GetUser = yield userService.findUser({ email: "admin@admin.com" });
                if (!GetUser) {
                    let User = yield userService.createUser(object);
                    console.log(User);
                    return;
                }
                console.log("Admin Already Exists !");
                return;
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.createRole();
                yield this.createAdmin();
            }
            catch (error) {
                throw Error(error);
            }
        });
    }
}
exports.Seeder = Seeder;
//# sourceMappingURL=seeder.js.map