import HandleError from '../interfaces/Error/handleError';
import Teams from '../database/models/teams';
import { ITeamService } from '../interfaces/Teams/TeamsService';

export default class TeamsService implements ITeamService<Teams> {
  constructor(private modelTeams = Teams) {
    this.modelTeams = modelTeams;
  }

  async getAll() : Promise<Teams[]> {
    const teams: Teams[] = await this.modelTeams.findAll();
    return teams;
  }

  async getById(id: number): Promise<Teams > {
    const team = await this.modelTeams.findOne({ where: { id } });
    if (!team) throw new HandleError('NotFound', 'Not Found');
    return team;
  }
}
