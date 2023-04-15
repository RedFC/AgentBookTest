import * as _ from "lodash";
import { ProjectService } from "../../../services/project.service";
let projectService = new ProjectService();
import { ResponseService } from "../../../services/response.service";
let responseService = new ResponseService();
export class ProjectController {

    async create(req, res) {
        try {
            let { name } = req.body;
            let projectObj = {
                name: name,
                createdBy: req.user.id
            }
            let createProject = await projectService.create(projectObj);
            return responseService.success({
                code: 200,
                status: true,
                data: createProject,
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }

    async read(req, res) {
        try {
            let read = await projectService.read();
            return responseService.success({
                code: 200,
                status: true,
                data: read,
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }

    async readOne(req, res) {
        try {
            let read = await projectService.readOne(req.params.id);
            return responseService.success({
                code: 200,
                status: true,
                data: read,
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }

    async update(req, res) {
        try {
            let { name } = req.body;
            let update = await projectService.update(req.params.id, name);
            return responseService.success({
                code: 200,
                status: true,
                data: update,
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }

    async delete(req, res) {
        try {
            let deleteData = await projectService.delete(req.params.id);
            return responseService.success({
                code: 200,
                status: true,
                data: deleteData,
            }, res)
        } catch (error) {
            return responseService.reject({
                code: 500,
                status: false,
                message: error.message
            }, res)
        }
    }

}
