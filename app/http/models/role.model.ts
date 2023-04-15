import mongoose, { Schema, Model} from "mongoose";
import { IRole } from "../interface/role.interface";

let RoleScheam = new Schema<IRole>(
  {
    name: String,
  },
  { timestamps: true }
);

export const RoleModel: Model<IRole> = mongoose.model<IRole>(
  "role",
  RoleScheam
);
