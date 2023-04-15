import mongoose, { Model, Schema } from 'mongoose';
import { IProject } from '../interface/project.interface';

let ProjectSchema = new mongoose.Schema<IProject>({
    'name': String,
    'createdBy': { type: Schema.Types.ObjectId, ref: 'user' }
},
    { timestamps: true });

export const ProjectModel:Model<IProject> = mongoose.model<IProject>('project', ProjectSchema);