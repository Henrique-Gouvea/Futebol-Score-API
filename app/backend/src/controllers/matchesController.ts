import { Request, Response, NextFunction } from 'express';
import { IMatcheservice } from '../interfaces/Matches/MatchesService';
import Matches from '../database/models/matches';
import { IMatches } from '../interfaces/Matches/Matches';

export default class MatchesController {
  constructor(private matchesService: IMatcheservice<Matches | IMatches>) { }

  async getAll(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const { inProgress } = req.query;
    let matches: Array<object> = [];

    if (inProgress) {
      matches = await this.matchesService.getByProgress(inProgress === 'true');
    } else {
      matches = await this.matchesService.getAll();
    }

    res.status(200).json(matches);
  }

  async getById(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const { id } = req.params;

    const team = await this.matchesService.getById(Number(id));

    res.status(200).json(team);
  }

  async updateProgress(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      console.log(req.params);
      await this.matchesService.updateProgress(Number(id), false);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }

  // async updateGoals(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
  //   await this.modelMatches.update({ ...data }, { where: { id } });
  // }
}
