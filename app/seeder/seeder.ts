import { Types } from "mongoose";
import { RoleService } from "../http/services/role.service";
import { UserService } from "../http/services/user.service";
import { PermissionService } from "../http/services/permission.service";

let roleService = new RoleService();
let userService = new UserService();
let permissionService = new PermissionService();

export class Seeder {

    async createRole() {
        try {
            let getCount = await roleService.findCount();
            if (getCount != 2) {
                let roleObject = [
                    { name: "Admin" },
                    { name: "User" },
                ];
                let createManyRole = await roleService.createManyRole(roleObject);
                console.log(createManyRole);
            }
            return
        } catch (error) {
            throw Error(error)
        }
    }

    async createAdmin() {
        try {
            let object = {
                username: "Admin", password: "admin12345", name: "admin", address: "admin space", email: "admin@admin.com", active: true, role: Types.ObjectId('64394c7674e2381b8c99d815')
            }
            let GetUser = await userService.findUser({ email: "admin@admin.com" })
            if (!GetUser) {
                let User = await userService.createUser(object);
                console.log(User);
                return
            }
            console.log("Admin Already Exists !");
            return
        } catch (error) {
            throw Error(error)
        }
    }

    async main() {
        try {
            await this.createRole();
            await this.createAdmin();
        } catch (error) {
            throw Error(error)
        }
    }
}
