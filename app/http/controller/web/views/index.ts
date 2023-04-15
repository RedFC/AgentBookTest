import express from 'express';
export const viewsRouter = express.Router();

import { Views } from './views.controller';
let views_controller = new Views()

viewsRouter.get('/', views_controller.index);

viewsRouter.get('/login', views_controller.login);

viewsRouter.get('/*', views_controller.not_found);
