import { Router } from 'express';
import users from '../controllers/user';
import user from '../middleware/validation';
import auth from '../middleware/authValidation';

const userRoutes = Router();

// create a user
userRoutes.post('/auth/signup', user.validateSignup, users.signUp);
userRoutes.post('/auth/signin', user.validateSignin, users.signIn);
userRoutes.patch('/users/:email/verify', auth.authentication, auth.adminRole, user.validateStatusChange, users.verify);
userRoutes.get('/users', auth.authentication, auth.adminRole, users.getUsers)

export default userRoutes;
