import mongoose, { Model, Schema } from 'mongoose';
import { IPermission } from '../interface/permission.interface';

let PermissionSchema = new mongoose.Schema<IPermission>({
    'table': String,
    'mode': [String],
    'user': { type: Schema.Types.ObjectId, ref: 'user' }
},
    { timestamps: true });

export const PermissionModel: Model<IPermission> = mongoose.model<IPermission>('permission', PermissionSchema);