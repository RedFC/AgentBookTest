import { ObjectId, Types } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  name: string;
  address: string;
  email: string;
  active: boolean;
  role?: Types.ObjectId;
}