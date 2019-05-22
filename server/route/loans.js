import { Router } from 'express';
import loans from '../controllers/loan';
import loan from '../middleware/loan_validation';
import auth from '../middleware/authValidation';

const loanRoutes = Router();

loanRoutes.post('/loans', auth.authentication, auth.userRole, loan.validateLoanRequest, loans.loanRequest);
loanRoutes.get('/loans', auth.authentication, auth.adminRole, loan.loanQuery, loans.getLoans);
export default loanRoutes;
