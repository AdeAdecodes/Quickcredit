import Debug from 'debug';
import userController from '../controllers/user';
import userValidate from '../middleware/validation';

const debug = Debug('quickcredit');
debug('show me here');


const API_VERSION = '/api/v1';
const route = (app) => {
  // create a user or admin
  app.post(`${API_VERSION}/auth/signup`, userValidate.validateSignup, userController.signup);
  app.post(`${API_VERSION}/auth/signin`, userValidate.validateSignin, userController.signin);
};

export default route;
