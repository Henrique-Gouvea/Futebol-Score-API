import { ITeam } from '../interfaces/Teams/Teams';
import { CreateMatches, GoalsMatches } from '../interfaces/Matches/Matches';
import HandleError from '../interfaces/Error/handleError';
import Matches from '../database/models/matches';
import { IMatcheservice } from '../interfaces/Matches/MatchesService';
import Teams from '../database/models/teams';
import { ITeamService } from '../interfaces/Teams/TeamsService';
import TeamsService from './teamsService';

export default class MatchesService implements IMatcheservice<Matches> {
  private teamService: ITeamService<Teams | ITeam>;
  constructor(
    private modelMatches = Matches,
  ) {
    this.modelMatches = modelMatches;
    this.teamService = new TeamsService();
  }

  async getAll() : Promise<Matches[]> {
    const matches: Matches[] = await this.modelMatches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  async getById(id: number): Promise<Matches > {
    const match = await this.modelMatches.findOne({ where: { id } });
    if (!match) throw new HandleError('NotFound', 'Not Found');
    return match;
  }

  async getByProgress(inProgress:boolean): Promise<Matches[]> {
    const matchs = await this.modelMatches.findAll({ include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { inProgress } });
    return matchs;
  }

  async updateProgress(id: number, finish: boolean): Promise<void> {
    await this.modelMatches.update({ inProgress: finish }, { where: { id } });
  }

  async updateGoals(id: number, data: GoalsMatches): Promise<void> {
    await this.modelMatches.update({ ...data }, { where: { id } });
  }

  async createMatchProgress(data: CreateMatches): Promise<CreateMatches> {
    const { homeTeam, awayTeam } = data;
    if (homeTeam === awayTeam) {
      throw new HandleError(
        'Unauthorized',
        'It is not possible to create a match with two equal teams',
      );
    }
    try {
      await this.teamService.getById(homeTeam);
      await this.teamService.getById(awayTeam);
    } catch (error) {
      throw new HandleError('NotFound', 'There is no team with such id!');
    }
    const matchCreated = await this.modelMatches.create({ ...data, inProgress: true });
    return matchCreated;
  }
}
