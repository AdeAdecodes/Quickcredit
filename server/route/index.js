import Debug from 'debug';
import users from '../controllers/user';
import user from '../middleware/validation';
import auth from '../middleware/authValidation';

const debug = Debug('quickcredit');
debug('show me here');


const API_VERSION = '/api/v1';
const route = (app) => {
  // create a user or admin
  app.post(`${API_VERSION}/auth/signup`, user.validateSignup, users.signup);
  app.post(`${API_VERSION}/auth/signin`, user.validateSignin, users.signin);
  app.post(`${API_VERSION}/auth/signin/admin`, auth.authentication, auth.adminRole, users.signin);
};

export default route;
