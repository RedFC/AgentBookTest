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
exports.CardController = void 0;
const mongoose_1 = require("mongoose");
const card_service_1 = require("../../../services/card.service");
const response_service_1 = require("../../../services/response.service");
let responseService = new response_service_1.ResponseService();
let cardService = new card_service_1.CardService();
class CardController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, priority, type, assignee, description, project } = req.body;
                let object = {
                    name,
                    priority,
                    type: type ? type : "todo",
                    assignee: assignee.map((x) => {
                        return mongoose_1.Types.ObjectId(x);
                    }),
                    description,
                    project,
                };
                let createCard = yield cardService.create(object);
                return responseService.success({
                    code: 200,
                    status: true,
                    data: createCard,
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message,
                }, res);
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let createCard = yield cardService.find();
                return responseService.success({
                    code: 200,
                    status: true,
                    data: createCard,
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message,
                }, res);
            }
        });
    }
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let createCard = yield cardService.findOne(req.params.id);
                return responseService.success({
                    code: 200,
                    status: true,
                    data: createCard,
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message,
                }, res);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message,
                }, res);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message,
                }, res);
            }
        });
    }
}
exports.CardController = CardController;
//# sourceMappingURL=card.controller.js.map