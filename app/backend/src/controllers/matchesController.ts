import { Request, Response, NextFunction } from 'express';
import { IMatcheservice } from '../interfaces/Matches/MatchesService';
import Matches from '../database/models/matches';
import { IMatches } from '../interfaces/Matches/Matches';

export default class MatchesController {
  constructor(private matchesService: IMatcheservice<Matches | IMatches>) { }

  async getAll(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const { inProgress } = req.query;
    console.log(inProgress);

    const matches = await this.matchesService.getAll();

    res.status(200).json(matches);
  }

  async getById(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const { id } = req.params;

    const team = await this.matchesService.getById(Number(id));

    res.status(200).json(team);
  }
}
