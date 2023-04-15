"use strict";

import { Types } from 'mongoose';
import { IRole } from '../interface/role.interface';
import { RoleModel } from '../models/role.model';


export class RoleService {
    constructor() { }

    findCount(): Promise<Number> {
        return new Promise(async (resolve, reject) => {
            try {
                const role = RoleModel.countDocuments()
                resolve(role)
            } catch (error) {
                reject(error)
            }
        })
    };

    createRole(roleData: IRole): Promise<IRole> {
        return new Promise(async (resolve, reject) => {
            try {
                const role = RoleModel.create(roleData);
                resolve(role)
            } catch (error) {
                reject(error)
            }
        })
    };

    createManyRole(roleData: IRole[]): Promise<IRole[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const role = RoleModel.insertMany(roleData);
                resolve(role)
            } catch (error) {
                reject(error)
            }
        })
    };

    findRole(id: Types.ObjectId): Promise<IRole> {
        return new Promise(async (resolve, reject) => {
            try {
                const role = RoleModel.findOne({_id: id});
                resolve(role)
            } catch (error) {
                reject(error)
            }
        })
    };
}
