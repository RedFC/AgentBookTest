import { Types } from "mongoose";
export interface IPermission {
    table: string;
    mode: string[];
    user: Types.ObjectId;
}