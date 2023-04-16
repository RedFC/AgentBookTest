"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = void 0;
const card_model_1 = require("../models/card.model");
class CardService {
    constructor() { }
    create(cardData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const card = card_model_1.CardModel.create(cardData);
                resolve(card);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    find(filterObject) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let query = {};
                if (filterObject) {
                    filterObject.map(x => {
                        query = Object.assign(Object.assign({}, query), { [x['type']]: x['ids'] });
                    });
                }
                const card = card_model_1.CardModel.find(query).populate('assignee').populate('project');
                resolve(card);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    findOne(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const card = card_model_1.CardModel.findOne({ _id: id }).populate('assignee').populate('project');
                resolve(card);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    update(id, payload) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const card = card_model_1.CardModel.findOneAndUpdate({ _id: id }, payload, { new: true });
                resolve(card);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    delete(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const card = card_model_1.CardModel.findOneAndDelete({ _id: id });
                resolve(card);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.CardService = CardService;
//# sourceMappingURL=card.service.js.map