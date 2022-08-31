import { Request, Response, NextFunction } from 'express';
import { ILearderboard } from '../interfaces/Learderboard/ILearderboard';
import { ILearderboardService } from '../interfaces/Learderboard/ILearderboardService';

export default class LearderboardController {
  constructor(private learderboardService: ILearderboardService<ILearderboard>) { }

  async getClassification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { path } = req.route;
      const homeOrAway: string = path.replace(/\//g, '');
      console.log(homeOrAway);

      const matchersFinished:
      ILearderboard[] = await this.learderboardService.getClassification(homeOrAway);
      res.status(200).json(matchersFinished);
    } catch (err) {
      next(err);
    }
  }
}
