import { Router } from 'express';
import TeamsController from '../controllers/teamsController';
import TeamsService from '../services/teamsService';
import TokenProvider from '../providers/tokenProvider';
import TokenMiddleware from '../middleware/tokenMiddleware';

const tokenProv = new TokenProvider();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);
const tokenMiddleware = new TokenMiddleware(tokenProv);

const teamsRouter = Router();

teamsRouter.use((req, res, next) => tokenMiddleware.checkTokenMiddleware(req, res, next));

teamsRouter.get('/', (req, res, next) => teamsController.getAll(req, res, next));

export default teamsRouter;
