import express from 'express';
import userRoutes from './users';
import loanRoutes from './loans';
import repaymentRoutes from './repayments'

const routes = express.Router();

routes.use(userRoutes, loanRoutes, repaymentRoutes);

export default routes;
