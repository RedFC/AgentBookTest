"use strict";

import { Types } from 'mongoose';
import { ICard } from '../interface/card.interface';
import { CardModel } from '../models/card.model';

export class CardService {
    constructor() { }

    create(cardData: ICard): Promise<ICard> {
        return new Promise(async (resolve, reject) => {
            try {
                const card = CardModel.create(cardData);
                resolve(card)
            } catch (error) {
                reject(error)
            }
        })
    }

    find(): Promise<ICard[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const card = CardModel.find().populate('assignee').populate('project')
                resolve(card)
            } catch (error) {
                reject(error)
            }
        })
    }

    findOne(id : Types.ObjectId): Promise<ICard> {
        return new Promise(async (resolve, reject) => {
            try {
                const card = CardModel.findOne({_id: id}).populate('assignee').populate('project')
                resolve(card)
            } catch (error) {
                reject(error)
            }
        })
    }

}
