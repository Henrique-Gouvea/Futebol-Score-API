import { Router } from 'express';
import UserController from '../controllers/usersController';
import UserService from '../services/usersService';

const userService = new UserService();
const userController = new UserController(userService);

const loginRouter = Router();

loginRouter.post('/', (req, res, next) => userController.login(req, res, next));

export default loginRouter;
