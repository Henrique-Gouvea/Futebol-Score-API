import { Request, Response, NextFunction } from 'express';
import { ILearderboardService } from '../interfaces/Learderboard/ILearderboardService';

export default class LearderboardController {
  constructor(private learderboardService: ILearderboardService<string>) { }

  async getClassification(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { path } = req.route;
      const homeOrAway: string = path.replace(/\//g, '');
      const matchersFinished = await this.learderboardService.getClassification(homeOrAway);
      res.status(200).json(matchersFinished);
    } catch (err) {
      next(err);
    }
  }
}
