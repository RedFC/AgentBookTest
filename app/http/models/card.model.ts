import mongoose, { Model, Schema } from 'mongoose';
import { ICard } from '../interface/card.interface';

let CardSchema = new mongoose.Schema<ICard>({
    name: String,
    priority: { type: String, enum: ['low', 'high', 'urgent'] },
    type: { type: String, enum: ['backlog', 'todo', 'inprocess', 'inreview', 'completed'] },
    assignee: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    description: String,
    project: { type: Schema.Types.ObjectId, ref: 'project' }
});

export const CardModel: Model<ICard> = mongoose.model<ICard>('card', CardSchema);

