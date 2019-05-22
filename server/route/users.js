import { Router } from 'express';
import users from '../controllers/user';
import user from '../middleware/validation';

const userRoutes = Router();
const API_VERSION = '/api/v1';

// create a user
userRoutes.post('/auth/signup', user.validateSignup, users.signUp);

export default userRoutes;
