import express from 'express';
import userRoutes from './users';
import loanRoutes from './loans';

const routes = express.Router();

routes.use(userRoutes, loanRoutes);

export default routes;
