"use strict";

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

}
