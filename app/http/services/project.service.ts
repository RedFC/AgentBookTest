"use strict";

import { Types } from "mongoose";
import { IProject } from "../interface/project.interface";
import { ProjectModel } from "../models/project.model";

export class ProjectService {
    constructor() { }

    create(projectData: IProject): Promise<IProject> {
        return new Promise(async (resolve, reject) => {
            try {
                const project = ProjectModel.create(projectData);
                resolve(project)
            } catch (error) {
                reject(error)
            }
        })
    }

    read(): Promise<IProject[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const project = ProjectModel.find().populate('createdBy');
                resolve(project)
            } catch (error) {
                reject(error)
            }
        })
    }

    readOne(id: Types.ObjectId): Promise<IProject> {
        return new Promise(async (resolve, reject) => {
            try {
                const project = ProjectModel.findOne({ _id: id }).populate('createdBy');
                resolve(project)
            } catch (error) {
                reject(error)
            }
        })
    }

    update(id: Types.ObjectId, name: string): Promise<IProject> {
        return new Promise(async (resolve, reject) => {
            try {
                const project = ProjectModel.findOneAndUpdate({ _id: id }, { name: name },{new : true});
                resolve(project)
            } catch (error) {
                reject(error)
            }
        })
    }

    delete(id: Types.ObjectId): Promise<IProject> {
        return new Promise(async (resolve, reject) => {
            try {
                const project = ProjectModel.findOneAndDelete({ _id: id });
                resolve(project)
            } catch (error) {
                reject(error)
            }
        })
    }
}
