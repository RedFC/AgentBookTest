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

    find(filterObject?: Array<Object>): Promise<ICard[]> {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {};
                if(filterObject){
                    filterObject.map(x => {
                        query = {
                            ...query, 
                            [x['type']]:x['ids'] 
                        }
                    })
                }
                const card = CardModel.find(query).populate('assignee').populate('project')
                resolve(card)
            } catch (error) {
                reject(error)
            }
        })
    }

    findOne(id: Types.ObjectId): Promise<ICard> {
        return new Promise(async (resolve, reject) => {
            try {
                const card = CardModel.findOne({ _id: id }).populate('assignee').populate('project')
                resolve(card)
            } catch (error) {
                reject(error)
            }
        })
    }

    update(id: Types.ObjectId, payload: ICard): Promise<ICard> {
        return new Promise(async (resolve, reject) => {
            try {
                const card = CardModel.findOneAndUpdate({ _id: id }, payload, { new: true });
                resolve(card)
            } catch (error) {
                reject(error)
            }
        })
    }

    delete(id: Types.ObjectId): Promise<ICard> {
        return new Promise(async (resolve, reject) => {
            try {
                const card = CardModel.findOneAndDelete({ _id: id });
                resolve(card)
            } catch (error) {
                reject(error)
            }
        })
    }

}
