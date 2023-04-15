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
exports.UserController = void 0;
const user_service_1 = require("../../../services/user.service");
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const auth_service_1 = require("../../../services/auth.service");
const response_service_1 = require("../../../services/response.service");
let userService = new user_service_1.UserService();
let authService = new auth_service_1.AuthService();
let responseService = new response_service_1.ResponseService();
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { username, password, name, address, email, active, role } = req.body;
                let User = yield userService.findUser({ email });
                if (User) {
                    return responseService.reject({
                        code: 409,
                        status: false,
                        message: "User Already Exists !",
                    }, res);
                }
                let create = yield userService.createUser({
                    username,
                    password,
                    name,
                    address,
                    email,
                    active,
                    role: role || mongoose_1.Types.ObjectId("64394c7674e2381b8c99d816"),
                });
                let token = yield authService.auth({
                    email: create.email,
                    id: create["_id"],
                    role: create.role["name"],
                    username: create.username,
                });
                return responseService.successLogin({
                    code: 200,
                    status: true,
                    data: create,
                    accessToken: token
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message
                }, res);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { password, email } = req.body;
                let User = yield userService.findUser({ email }, "role");
                if (!User) {
                    return res.status(404).send({
                        status: "false",
                        code: "404",
                        message: "User Not Exists !",
                    });
                }
                let passwordCompare = yield bcrypt_1.compare(password, User.password);
                if (!passwordCompare) {
                    return res.status(403).send({
                        status: "false",
                        code: "403",
                        message: "Incorrect Email Or Password !",
                    });
                }
                let token = yield authService.auth({
                    email: User.email,
                    id: User["_id"],
                    role: User.role["name"],
                    username: User.username,
                });
                return res.status(200).send({
                    status: "true",
                    code: "200",
                    message: "Logged In Succesfully",
                    data: User,
                    accessToken: token,
                });
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message
                }, res);
            }
        });
    }
    forgotPassword() { }
    resetPassword() { }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map