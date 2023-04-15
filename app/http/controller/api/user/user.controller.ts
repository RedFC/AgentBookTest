import * as _ from "lodash";
import { UserService } from "../../../services/user.service";
import { Types } from "mongoose";
import { compare } from "bcrypt";
import { AuthService } from "../../../services/auth.service";
import { ResponseService } from "../../../services/response.service";
let userService = new UserService();
let authService = new AuthService();
let responseService = new ResponseService();
export class UserController {

    async signup(req, res) {
        try {
            let { username, password, name, address, email, active, role } = req.body;
            let User = await userService.findUser({ email });
            if (User) {
                return responseService.reject({
                    code: 409,
                    status: false,
                    message: "User Already Exists !",
                }, res)
            }
            let create = await userService.createUser({
                username,
                password,
                name,
                address,
                email,
                active,
                role: role || Types.ObjectId("64394c7674e2381b8c99d816"),
            });
            let token = await authService.auth({
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
                return res.status(403).send({
                    status: "false",
                    code: "403",
                    message: "Incorrect Email Or Password !",
                });
            }
            let token = await authService.auth({
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
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }

    forgotPassword() { }

    resetPassword() { }
}
