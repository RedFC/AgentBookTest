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
exports.ProjectService = void 0;
const project_model_1 = require("../models/project.model");
class ProjectService {
    constructor() { }
    create(projectData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const project = project_model_1.ProjectModel.create(projectData);
                resolve(project);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    read() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const project = project_model_1.ProjectModel.find().populate('createdBy');
                resolve(project);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    readOne(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const project = project_model_1.ProjectModel.findOne({ _id: id }).populate('createdBy');
                resolve(project);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    update(id, name) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const project = project_model_1.ProjectModel.findOneAndUpdate({ _id: id }, { name: name }, { new: true });
                resolve(project);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    delete(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const project = project_model_1.ProjectModel.findOneAndDelete({ _id: id });
                resolve(project);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map