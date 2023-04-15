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
exports.ProjectController = void 0;
const project_service_1 = require("../../../services/project.service");
let projectService = new project_service_1.ProjectService();
const response_service_1 = require("../../../services/response.service");
let responseService = new response_service_1.ResponseService();
class ProjectController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name } = req.body;
                let projectObj = {
                    name: name,
                    createdBy: req.user.id
                };
                let createProject = yield projectService.create(projectObj);
                return responseService.success({
                    code: 200,
                    status: true,
                    data: createProject,
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message
                }, res);
            }
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let read = yield projectService.read();
                return responseService.success({
                    code: 200,
                    status: true,
                    data: read,
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message
                }, res);
            }
        });
    }
    readOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let read = yield projectService.readOne(req.params.id);
                return responseService.success({
                    code: 200,
                    status: true,
                    data: read,
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message
                }, res);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name } = req.body;
                let update = yield projectService.update(req.params.id, name);
                return responseService.success({
                    code: 200,
                    status: true,
                    data: update,
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message
                }, res);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let deleteData = yield projectService.delete(req.params.id);
                return responseService.success({
                    code: 200,
                    status: true,
                    data: deleteData,
                }, res);
            }
            catch (error) {
                return responseService.reject({
                    code: 500,
                    status: false,
                    message: error.message
                }, res);
            }
        });
    }
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map