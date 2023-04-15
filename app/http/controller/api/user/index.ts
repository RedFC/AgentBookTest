import express from 'express';
export const UserRouter = express.Router();
import { UserController } from './user.controller'
let userController = new UserController();

UserRouter.post('/register',userController.signup)
UserRouter.post('/login',userController.login)