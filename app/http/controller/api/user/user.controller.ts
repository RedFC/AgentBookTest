import * as _ from "lodash";
import { UserService } from "../../../services/user.service";
import { Types } from "mongoose";
import { compare, genSalt, hash } from "bcrypt";
import { AuthService } from "../../../services/auth.service";
import { ResponseService } from "../../../services/response.service";
import { ForgotService } from "../../../services/forgot.service";
import { RoleService } from "../../../services/role.service";
let userService = new UserService();
let authService = new AuthService();
let responseService = new ResponseService();
let forgotService = new ForgotService();
let roleService = new RoleService();

export class UserController {

    async signup(req, res) {
        try {
            let { username, password, name, address, email } = req.body;
            let User = await userService.findUser({ email });
            if (User) {
                return responseService.reject({
                    code: 409,
                    status: false,
                    message: "User Already Exists !",
                }, res)
            }
            let object = {
                username,
                password,
                name,
                address,
                email,
                active: true,
                role: Types.ObjectId("64394c7674e2381b8c99d816"),
            }
            let create = await userService.createUser(object);
            let getRole = await roleService.findRole(object.role);

            let token = await authService.auth({
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
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }


    async login(req, res) {
        try {
            let { password, email } = req.body;
            let User = await userService.findUser({ email }, "role");
            if (!User) {
                return res.status(404).send({
                    status: "false",
                    code: "404",
                    message: "User Not Exists !",
                });
            }
            let passwordCompare = await compare(password, User.password);
            if (!passwordCompare) {
                return res.status(401).send({
                    status: "false",
                    code: "401",
                    message: "Incorrect Email Or Password !",
                });
            }
            let token = await authService.auth({
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
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }


    async me(req, res) {
        try {
            let User = await userService.findUser({ email: req.user.email }, "role");
            return responseService.success({
                code: 200,
                status: true,
                data: User
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }

    async forgotPassword(req, res) {
        try {
            let { email } = req.body;
            let User = await userService.findUser({ email: email });
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
            let forgot = await forgotService.create({ otp: OTP, user: User['_id'] })
            return responseService.success({
                code: 200,
                status: true,
                data: { otp: forgot.otp },
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }

    async resetPassword(req, res) {
        try {
            let { otp, email, password } = req.body;
            let checkOtp = await forgotService.findOne(otp);
            if (!checkOtp) {
                return res.status(404).send({
                    status: "false",
                    code: "404",
                    message: "Otp Is Expired Or Not Valid !",
                });
            }
            let User = await userService.findUser({ email });
            if (!User) {
                return res.status(404).send({
                    status: "false",
                    code: "404",
                    message: "User Not Exists !",
                });
            }
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            let updateUser = await userService.patchPassword(User['_id'], hashedPassword);
            let deleteOtp = await forgotService.delete(checkOtp['_id'])
            let AllResolve = await Promise.all([updateUser, deleteOtp])
            return responseService.success({
                code: 200,
                status: true,
                data: AllResolve[0],
                message: "Password Updated !"
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }
}
