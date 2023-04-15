// importing types from mongoose
import { Types } from "mongoose";

// project interface
export interface IProject {
    name: string;
    createdBy?: Types.ObjectId;
}