import express from "express";
export const PorjectRouter = express.Router();
import { ProjectController } from "./project.controller";
import { AuthenticationMiddleware } from "../../../middleware/auth";
import { RoleMiddleware } from "../../../middleware/role";
import { ValidationMiddleware } from "../../../middleware/validation";
let projectController = new ProjectController();
let authMiddleware = new AuthenticationMiddleware();
let roleMiddleware = new RoleMiddleware();
let validationMiddleware = new ValidationMiddleware();

PorjectRouter.post(
  "/",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isAdmin(),
  validationMiddleware.validateProject(),
  projectController.create
);
PorjectRouter.get(
  "/",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isUser(),
  projectController.read
);
PorjectRouter.get(
  "/:id",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isUser(),
  validationMiddleware.validateProjectExist(),
  projectController.readOne
);
PorjectRouter.put(
  "/:id",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isAdmin(),
  validationMiddleware.validateProject(),
  validationMiddleware.validateProjectExist(),
  projectController.update
);
PorjectRouter.delete(
  "/:id",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isAdmin(),
  validationMiddleware.validateProjectExist(),
  projectController.delete
);
