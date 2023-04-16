import { Types } from "mongoose";

export interface IForgot {
    otp : string;
    user: Types.ObjectId
}