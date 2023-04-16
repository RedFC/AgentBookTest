import express from "express";
export const CardRouter = express.Router();
import { CardController } from "./card.controller";
import { AuthenticationMiddleware } from "../../../middleware/auth";
import { RoleMiddleware } from "../../../middleware/role";
import { ValidationMiddleware } from "../../../middleware/validation";
let cardController = new CardController();
let authMiddleware = new AuthenticationMiddleware();
let roleMiddleware = new RoleMiddleware();
let validationMiddleware = new ValidationMiddleware();

CardRouter.post(
  "/",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isUser(),
  validationMiddleware.validateCard(),
  cardController.create
);
CardRouter.get(
  "/",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isUser(),
  cardController.read
);
CardRouter.get(
  "/:id",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isUser(),
  validationMiddleware.validateCardExist(),
  cardController.readOne
);
CardRouter.put(
  "/:id",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isUser(),
  validationMiddleware.validateCardExist(),
  cardController.update
);
CardRouter.delete(
  "/:id",
  authMiddleware.isAuthenticated(),
  roleMiddleware.isUser(),
  validationMiddleware.validateCardExist(),
  cardController.delete
);
