import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

/**
 * Route and middleware responsible to create and manager session
 */
routes.post('/sessions', SessionController.store);
routes.use(authMiddleware);

/**
 * Routes responsible to manager Recipients
 */
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id/', RecipientController.update);

export default routes;
