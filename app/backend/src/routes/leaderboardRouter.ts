import { Router } from 'express';
import LearderboardController from '../controllers/learderboardController';
import LearderboardService from '../services/learderboardService';
// import TokenProvider from '../providers/tokenProvider';
// import CryptoProvider from '../providers/cryptoProvider';
// import TokenMiddleware from '../middleware/tokenMiddleware';

// const tokenProv = new TokenProvider();
// const cryptoProv = new CryptoProvider();

const learderboardService = new LearderboardService();
const learderboard = new LearderboardController(learderboardService);
// const tokenMiddleware = new TokenMiddleware(tokenProv);

const leaderboardRouter = Router();

leaderboardRouter.get(
  '/home',
  (req, res, next) => learderboard.getClassification(req, res, next),
);

leaderboardRouter.get(
  '/away',
  (req, res, next) => learderboard.getClassification(req, res, next),
);

// leaderboardRouter.use((req, res, next) => tokenMiddleware.checkTokenMiddleware(req, res, next));

export default leaderboardRouter;
