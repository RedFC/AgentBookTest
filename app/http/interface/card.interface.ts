// importing types from mongoose
import { Types } from "mongoose";

// card interface
export interface ICard {
    name: string;
    priority: string;
    type: string;
    assignee: Types.ObjectId[];
    description: string;
    project: Types.ObjectId;
}