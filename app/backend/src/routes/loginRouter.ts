import { Router } from 'express';
import UserController from '../controllers/usersController';
import UserService from '../services/usersService';
import TokenProvider from '../providers/tokenProvider';
import CryptoProvider from '../providers/cryptoProvider';
import TokenMiddleware from '../middleware/tokenMiddleware';

const tokenProv = new TokenProvider();
const cryptoProv = new CryptoProvider();

const userService = new UserService(tokenProv, cryptoProv);
const userController = new UserController(userService);
const tokenMiddleware = new TokenMiddleware(tokenProv);

const loginRouter = Router();

loginRouter.post('/', (req, res, next) => userController.login(req, res, next));

// loginRouter.use((req, res, next) => tokenMiddleware.checkTokenMiddleware(req, res, next));

loginRouter.get(
  '/validate',
  // (req, res, next) => tokenMiddleware.checkTokenMiddleware(req, res, next),
  (req, res, next) => userController.validate(req, res, next),
);

export default loginRouter;
