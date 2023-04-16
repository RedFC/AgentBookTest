import { Types } from "mongoose";
import { IForgot } from "../interface/forgot.interface";
import { ForgotModel } from "../models/forgot.model";

export class ForgotService {
    create(forgotData: IForgot): Promise<IForgot> {
        return new Promise(async (resolve, reject) => {
            try {
                const forgot = ForgotModel.create(forgotData);
                resolve(forgot)
            } catch (error) {
                reject(error)
            }
        })
    }

    findOne(otp: string): Promise<IForgot> {
        return new Promise(async (resolve, reject) => {
            try {
                const forgot = ForgotModel.findOne({otp:otp});
                resolve(forgot)
            } catch (error) {
                reject(error)
            }
        })
    }

    delete(id: Types.ObjectId): Promise<IForgot> {
        return new Promise(async (resolve, reject) => {
            try {
                const forgot = ForgotModel.findOneAndDelete({_id: id});
                resolve(forgot)
            } catch (error) {
                reject(error)
            }
        })
    }
}