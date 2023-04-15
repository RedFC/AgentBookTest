import express from 'express';
export const PorjectRouter = express.Router();
import { ProjectController } from './project.controller';
import { AuthenticationMiddleware } from '../../../middleware/auth'
let projectController = new ProjectController();
let authMiddleware = new AuthenticationMiddleware();

PorjectRouter.post('/', authMiddleware.isAuthenticated(), projectController.create)
PorjectRouter.get('/', authMiddleware.isAuthenticated(), projectController.read)
PorjectRouter.get('/:id', authMiddleware.isAuthenticated(), projectController.readOne)
PorjectRouter.put('/:id', authMiddleware.isAuthenticated(), projectController.update)
PorjectRouter.delete('/:id', authMiddleware.isAuthenticated(), projectController.delete)