import { Router } from 'express';
import users from '../controllers/user';
import user from '../middleware/validation';

const userRoutes = Router();

// create a user
userRoutes.post('/auth/signup', user.validateSignup, users.signUp);
userRoutes.post('/auth/signin', user.validateSignin, users.signIn);

export default userRoutes;
