import mongoose, { Model, Schema } from 'mongoose';
import { IForgot } from '../interface/forgot.interface';

let ForgotSchema = new mongoose.Schema<IForgot>({
    'otp': String,
    'user': { type: Schema.Types.ObjectId, ref: 'user' }
},
    { timestamps: true });

export const ForgotModel: Model<IForgot> = mongoose.model<IForgot>('forgot', ForgotSchema);