import { Request, Response, NextFunction } from 'express';
import { ITeam } from '../interfaces/Teams/Teams';
import { ITeamService } from '../interfaces/Teams/TeamsService';
import Teams from '../database/models/teams';

export default class TeamsController {
  constructor(private userService: ITeamService<Teams | ITeam>) { }

  async getAll(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    console.log(this.getAll);

    const teams = await this.userService.getAll();
    console.log(teams);

    res.status(200).json(teams);
  }
}
