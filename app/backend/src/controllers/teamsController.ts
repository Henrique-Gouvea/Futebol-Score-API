import { Request, Response, NextFunction } from 'express';
import { ITeam } from '../interfaces/Teams/Teams';
import { ITeamService } from '../interfaces/Teams/TeamsService';
import Teams from '../database/models/teams';

export default class TeamsController {
  constructor(private teamService: ITeamService<Teams | ITeam>) { }

  async getAll(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const teams = await this.teamService.getAll();

    res.status(200).json(teams);
  }

  async getById(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    const { id } = req.params;

    const team = await this.teamService.getById(Number(id));

    res.status(200).json(team);
  }
}
