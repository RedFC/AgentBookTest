import mongoose, { Schema, Model, Types } from "mongoose";

import { genSalt, hash } from "bcrypt";
import { IUser } from "../interface/user.interface";
import { PermissionService } from "../services/permission.service";
import { RoleService } from "../services/role.service";
let permissionService = new PermissionService();
let roleService = new RoleService();
let UserSchema = new Schema<IUser>(
    {
        username: String,
        password: String,
        name: String,
        address: String,
        email: String,
        active: Boolean,
        role: { type: Schema.Types.ObjectId, ref: "role" },
    },
    { timestamps: true }
);

UserSchema.pre<IUser>("save", async function (next) {
    try {
        const salt = await genSalt(10);
        const hashedPassword = await hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        throw Error(err);
    }
});

UserSchema.post("save", async function () {
    try {
        let mode = ["create", "read", "update", "delete"];
        let getRole = await roleService.findRole(this.role);
        let Permissions = [
            {
                table: "card",
                mode:
                    getRole && getRole.name == "Admin"
                        ? mode
                        : ["create", "read", "update", "delete"],
                user: this._id,
            },
            {
                table: "project",
                mode: getRole && getRole.name == "Admin" ? mode : ["read"],
                user: this._id,
            },
            {
                table: "role",
                mode: getRole && getRole.name == "Admin" ? mode : [],
                user: this._id,
            },
        ];
        await permissionService.createUserPermissions(Permissions);
    } catch (error) {
        throw Error(error);
    }
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
    "user",
    UserSchema
);
