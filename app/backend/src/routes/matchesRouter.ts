import { Router } from 'express';
import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';
import TokenProvider from '../providers/tokenProvider';
import TokenMiddleware from '../middleware/tokenMiddleware';

const tokenProv = new TokenProvider();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);
const tokenMiddleware = new TokenMiddleware(tokenProv);

const matchesRouter = Router();

matchesRouter.get('/', (req, res, next) => matchesController.getAll(req, res, next));

matchesRouter.use((req, res, next) => tokenMiddleware.checkTokenMiddleware(req, res, next));
matchesRouter.patch(
  '/:id/finish',
  (req, res, next) => matchesController.updateProgress(req, res, next),
);

export default matchesRouter;
