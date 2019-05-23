import { Router } from 'express';
import repayment from '../controllers/repayment';
import loan from '../middleware/loan_validation';
import auth from '../middleware/authValidation';

const repaymentRoutes = Router();

repaymentRoutes.post('/repayment', auth.authentication, auth.userRole, loan.payment, repayment.payment)
repaymentRoutes.patch('/repayment/:loanId/:id', auth.authentication, auth.adminRole, loan.loanStatusChange, repayment.verify);
export default repaymentRoutes;
