import { Request, Response, NextFunction } from 'express';
import { ILearderboardService } from '../interfaces/Learderboard/ILearderboardService';

export default class LearderboardController {
  constructor(private learderboardService: ILearderboardService<string>) { }

  async getMatchersFinished(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { path } = req.route;
      const homeOrAway: string = path.replace(/\//g, '');
      const matchersFinished = await this.learderboardService.getMatchersFinished(homeOrAway);
      res.status(200).json({ message: matchersFinished });
    } catch (err) {
      next(err);
    }
  }
}
