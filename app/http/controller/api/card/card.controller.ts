import { Types } from "mongoose";
import { CardService } from "../../../services/card.service";
import { ResponseService } from "../../../services/response.service";
let responseService = new ResponseService();
let cardService = new CardService();

export class CardController {
    async create(req, res) {
        try {
            let { name, priority, type, assignee, description, project } = req.body;
            let object = {
                name,
                priority,
                type: type ? type : "todo",
                assignee: assignee.map((x) => {
                    return Types.ObjectId(x);
                }),
                description,
                project,
            };

            let createCard = await cardService.create(object);
            return responseService.success(
                {
                    code: 200,
                    status: true,
                    data: createCard,
                },
                res
            );
        } catch (error) {
            return responseService.reject(
                {
                    code: 500,
                    status: false,
                    message: error.message,
                },
                res
            );
        }
    }

    async read(req, res) {
        try {
            let createCard = await cardService.find();
            return responseService.success(
                {
                    code: 200,
                    status: true,
                    data: createCard,
                },
                res
            );
        } catch (error) {
            return responseService.reject(
                {
                    code: 500,
                    status: false,
                    message: error.message,
                },
                res
            );
        }
    }

    async readOne(req, res) {
        try {
            let createCard = await cardService.findOne(req.params.id);
            return responseService.success(
                {
                    code: 200,
                    status: true,
                    data: createCard,
                },
                res
            );
        } catch (error) {
            return responseService.reject(
                {
                    code: 500,
                    status: false,
                    message: error.message,
                },
                res
            );
        }
    }

    async update(req, res) {
        try {
        } catch (error) {
            return responseService.reject(
                {
                    code: 500,
                    status: false,
                    message: error.message,
                },
                res
            );
        }
    }

    async delete(req, res) {
        try {
        } catch (error) {
            return responseService.reject(
                {
                    code: 500,
                    status: false,
                    message: error.message,
                },
                res
            );
        }
    }
}
