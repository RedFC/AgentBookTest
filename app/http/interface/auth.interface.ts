import { IUser } from "./user.interface";

export interface IAuth extends IUser{
    token : string;
}