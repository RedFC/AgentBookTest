import express from 'express';
export const UserRouter = express.Router();
import { UserController } from './user.controller';
import { ValidationMiddleware } from '../../../middleware/validation';
import { AuthenticationMiddleware } from '../../../middleware/auth';

let userController = new UserController();
let validationMiddleware = new ValidationMiddleware();
let authMiddleware = new AuthenticationMiddleware();

UserRouter.post('/register', validationMiddleware.validateRegisterData(), userController.signup)
UserRouter.post('/login', validationMiddleware.validateUserLogin(), userController.login)
UserRouter.get('/me', authMiddleware.isAuthenticated(), userController.me)
UserRouter.post('/forgot', validationMiddleware.validateUserForgotPasswordReset(), userController.forgotPassword)
UserRouter.post('/reset', validationMiddleware.validateUserPasswordReset(), userController.resetPassword)