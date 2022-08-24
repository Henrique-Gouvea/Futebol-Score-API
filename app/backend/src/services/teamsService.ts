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

  async getById(id: number): Promise<Teams | null > {
    const team = await this.modelTeams.findOne({ where: { id } });
    return team;
  }
}
