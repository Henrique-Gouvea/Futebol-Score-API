import { ITeam } from '../interfaces/Teams/Teams';
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

  async getById(id: number): Promise<ITeam | undefined > {
    const { id, teamName } = await this.modelTeams.findOne(id) as ITeam;
    return { id, teamName };
  }
}
