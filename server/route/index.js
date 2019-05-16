import Debug from 'debug';
import users from '../controllers/user';
import admin from '../controllers/admin';
import loans from '../controllers/loan';
import user from '../middleware/validation';
import auth from '../middleware/authValidation';
import loan from '../middleware/loan_validation';


const debug = Debug('quickcredit');
debug('show me here');


const API_VERSION = '/api/v1';
const route = (app) => {
  // create a user or admin
  app.post(`${API_VERSION}/auth/signup`, user.validateSignup, users.signup);
  // User can Login
  app.post(`${API_VERSION}/auth/signin`, user.validateSignin, users.signin);
  // Admin can login
  app.post(`${API_VERSION}/auth/signin/admin`, auth.authentication, auth.adminRole, users.signin);
  //  Admin can verify users
  app.patch(`${API_VERSION}/users/:email/verify`, auth.authentication, auth.adminRole, user.validateStatusChange, admin.verify);
  // Admin can get users
  app.get(`${API_VERSION}/users`, auth.authentication, auth.adminRole, admin.getAllUsers);
  //  A user can request for loan
  app.post(`${API_VERSION}/loans`, loan.validateLoanRequest, loans.loanrequest);
  // Admin can get all loan request
  app.get(`${API_VERSION}/loans`, auth.authentication, auth.adminRole, loan.loanQuery, admin.getAllLoans);
  // Admin can get a specific loan request
  app.get(`${API_VERSION}/loans/:id/`, auth.authentication, auth.adminRole, admin.getLoansById);
  // Admin can Approve or Reject loans
  app.patch(`${API_VERSION}/loan/:id/`, auth.authentication, auth.adminRole, loan.loanStatusChange, admin.loanVerify);
};

export default route;
