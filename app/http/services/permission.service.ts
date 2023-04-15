"use strict";

import { IPermission } from '../interface/permission.interface';
import { PermissionModel } from '../models/permission.model';

export class PermissionService {
    constructor() { }

    createUserPermissions(permissionData: IPermission[]): Promise<IPermission[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const permissions = PermissionModel.insertMany(permissionData);
                resolve(permissions)
            } catch (error) {
                reject(error)
            }
        })
    }

    getUserPermissions(userId: string): Promise<IPermission> {
        return new Promise(async (resolve, reject) => {
            try {
                const permissions = PermissionModel.findOne({_id: userId});
                resolve(permissions)
            } catch (error) {
                reject(error)
            }
        })
    }
}
