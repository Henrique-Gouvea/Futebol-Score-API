import { Router } from 'express';
import UserController from '../controllers/usersController';
import UserService from '../services/usersService';
import 'express-async-errors';
import TokenProvider from '../providers/tokenProvider';
import CryptoProvider from '../providers/cryptoProvider';

const tokenProv = new TokenProvider();
const cryptoProv = new CryptoProvider();

const userService = new UserService(tokenProv, cryptoProv);
const userController = new UserController(userService);

const loginRouter = Router();

loginRouter.post('/', (req, res, next) => userController.login(req, res, next));

export default loginRouter;
