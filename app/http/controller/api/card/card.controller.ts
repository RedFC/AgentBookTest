import { Types } from "mongoose";
import { CardService } from "../../../services/card.service";
import { ResponseService } from "../../../services/response.service";
import { ICard } from "../../../interface/card.interface";
import { ProjectService } from "../../../services/project.service";
let responseService = new ResponseService();
let cardService = new CardService();

export class CardController {
  async create(req, res) {
    try {
      let { name, priority, type, assignee, description, project } = req.body;
      let projectCheck = await new ProjectService().readOne(project);
      if (!projectCheck) {
        return responseService.reject(
          {
            code: 404,
            status: false,
            message: "Project Not Found !",
          },
          res
        );
      }
      let object = {
        name,
        priority: priority ? priority : "low",
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
      let getKeys = Object.keys(req.query);
      let filterObjects = getKeys.map((key) => {
        return {
          type: key,
          ids: Array.isArray(req.query[key])
            ? req.query[key]
            : [req.query[key]],
        };
      });
      let createCard = await cardService.find(filterObjects);
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
      let { name, priority, type, assignee, description, project } = req.body;
      let object = {
        name,
        priority,
        type,
        description,
        project,
      };
      assignee && assignee.length
        ? (object["assignee"] = assignee.map((x) => {
            return Types.ObjectId(x);
          }))
        : "";
      Object.keys(object).map((x) => {
        if (
          typeof object[x] == "undefined" ||
          typeof object[x] == undefined ||
          typeof object[x] == null
        ) {
          delete object[x];
        }
      });
      let createCard = await cardService.update(req.params.id, object);
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

  async delete(req, res) {
    try {
      let createCard = await cardService.delete(req.params.id);
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
}
