import { Router } from 'express';
import UserController from '../controllers/usersController';
import UserService from '../services/usersService';
import 'express-async-errors';
import TokenProvider from '../providers/tokenProvider';

const tokenProv = new TokenProvider();

const userService = new UserService(tokenProv);
const userController = new UserController(userService);

const loginRouter = Router();

loginRouter.post('/', (req, res, next) => userController.login(req, res, next));

export default loginRouter;
