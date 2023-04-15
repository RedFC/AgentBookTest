import express from 'express';
export const CardRouter = express.Router();
import { CardController } from './card.controller';
import { AuthenticationMiddleware } from '../../../middleware/auth'
let cardController = new CardController();
let authMiddleware = new AuthenticationMiddleware();

CardRouter.post('/', authMiddleware.isAuthenticated(), cardController.create)
CardRouter.get('/', authMiddleware.isAuthenticated(), cardController.read)
CardRouter.get('/:id', authMiddleware.isAuthenticated(), cardController.readOne)
CardRouter.put('/:id', authMiddleware.isAuthenticated(), cardController.update)
CardRouter.delete('/:id', authMiddleware.isAuthenticated(), cardController.delete)