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
const forgot_service_1 = require("../../../services/forgot.service");
const role_service_1 = require("../../../services/role.service");
let userService = new user_service_1.UserService();
let authService = new auth_service_1.AuthService();
let responseService = new response_service_1.ResponseService();
let forgotService = new forgot_service_1.ForgotService();
let roleService = new role_service_1.RoleService();
class UserController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { username, password, name, address, email } = req.body;
                let User = yield userService.findUser({ email });
                if (User) {
                    return responseService.reject({
                        code: 409,
                        status: false,
                        message: "User Already Exists !",
                    }, res);
                }
                let object = {
                    username,
                    password,
                    name,
                    address,
                    email,
                    active: true,
                    role: mongoose_1.Types.ObjectId("64394c7674e2381b8c99d816"),
                };
                let create = yield userService.createUser(object);
                let getRole = yield roleService.findRole(object.role);
                let token = yield authService.auth({
                    email: create.email,
                    id: create["_id"],
                    role: getRole.name,
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
                    return res.status(401).send({
                        status: "false",
                        code: "401",
                        message: "Incorrect Email Or Password !",
                    });
                }
                let token = yield authService.auth({
                    email: User.email,
                    id: User["_id"],
                    role: User.role["name"],
                    username: User.username,
                });
                return responseService.successLogin({
                    code: 200,
                    status: true,
                    message: "Logged In Succesfully",
                    data: User,
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
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let User = yield userService.findUser({ email: req.user.email }, "role");
                return responseService.success({
                    code: 200,
                    status: true,
                    data: User
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
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email } = req.body;
                let User = yield userService.findUser({ email: email });
                if (!User) {
                    return res.status(404).send({
                        status: "false",
                        code: "404",
                        message: "User Not Exists !",
                    });
                }
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 4; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                let forgot = yield forgotService.create({ otp: OTP, user: User['_id'] });
                return responseService.success({
                    code: 200,
                    status: true,
                    data: { otp: forgot.otp },
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
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { otp, email, password } = req.body;
                let checkOtp = yield forgotService.findOne(otp);
                if (!checkOtp) {
                    return res.status(404).send({
                        status: "false",
                        code: "404",
                        message: "Otp Is Expired Or Not Valid !",
                    });
                }
                let User = yield userService.findUser({ email });
                if (!User) {
                    return res.status(404).send({
                        status: "false",
                        code: "404",
                        message: "User Not Exists !",
                    });
                }
                const salt = yield bcrypt_1.genSalt(10);
                const hashedPassword = yield bcrypt_1.hash(password, salt);
                let updateUser = yield userService.patchPassword(User['_id'], hashedPassword);
                let deleteOtp = yield forgotService.delete(checkOtp['_id']);
                let AllResolve = yield Promise.all([updateUser, deleteOtp]);
                return responseService.success({
                    code: 200,
                    status: true,
                    data: AllResolve[0],
                    message: "Password Updated !"
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
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map