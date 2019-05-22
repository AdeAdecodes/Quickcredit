import express from 'express';
import userRoutes from './users';

const routes = express.Router();


routes.use(userRoutes);

export default routes;
