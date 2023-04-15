"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = require("bcrypt");
const permission_service_1 = require("../services/permission.service");
const role_service_1 = require("../services/role.service");
let permissionService = new permission_service_1.PermissionService();
let roleService = new role_service_1.RoleService();
let UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    name: String,
    address: String,
    email: String,
    active: Boolean,
    role: { type: mongoose_1.Schema.Types.ObjectId, ref: "role" },
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt_1.genSalt(10);
            const hashedPassword = yield bcrypt_1.hash(this.password, salt);
            this.password = hashedPassword;
            return next();
        }
        catch (err) {
            throw Error(err);
        }
    });
});
UserSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mode = ["create", "read", "update", "delete"];
            let getRole = yield roleService.findRole(this.role);
            let Permissions = [
                {
                    table: "card",
                    mode: getRole && getRole.name == "Admin"
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
            yield permissionService.createUserPermissions(Permissions);
        }
        catch (error) {
            throw Error(error);
        }
    });
});
exports.UserModel = mongoose_1.default.model("user", UserSchema);
//# sourceMappingURL=user.model.js.map