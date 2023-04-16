"use strict";

import { Types } from 'mongoose';
import { IUser } from '../interface/user.interface';
import { UserModel } from '../models/user.model';

export class UserService {
    constructor() { }

    createUser(userData: IUser): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = UserModel.create(userData);
                resolve(user)
            } catch (error) {
                reject(error)
            }
        })
    }

    findUser(userData: { username?: string, email?: string }, attribute?: string): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = attribute ? UserModel.findOne(userData).populate(attribute) : UserModel.findOne(userData)
                resolve(user)
            } catch (error) {
                reject(error)
            }
        })
    }

    update(id: Types.ObjectId,payload: IUser): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = UserModel.findOneAndUpdate({_id: id},payload,{new: true});
                resolve(user)
            } catch (error) {
                reject(error)
            }
        })
    }

    patchPassword(id: Types.ObjectId,password: string): Promise<IUser> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = UserModel.findOneAndUpdate({_id: id},{password: password},{new: true});
                resolve(user)
            } catch (error) {
                reject(error)
            }
        })
    }

}
