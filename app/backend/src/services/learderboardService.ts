import { ITeamService } from '../interfaces/Teams/TeamsService';
import Teams from '../database/models/teams';
import { ITeam } from '../interfaces/Teams/Teams';
import { ILearderboardService } from '../interfaces/Learderboard/ILearderboardService';
import Matches from '../database/models/matches';
import { IMatcheservice } from '../interfaces/Matches/MatchesService';
import MatchesService from './matchesService';
import TeamsService from './teamsService';

export default class LearderboardService implements ILearderboardService<string> {
  private matchesService: IMatcheservice<Matches>;
  private teamService: ITeamService<Teams | ITeam>;

  constructor(
    private modelMatches = Matches,
  ) {
    this.modelMatches = modelMatches;
    this.matchesService = new MatchesService();
    this.teamService = new TeamsService();
  }

  getPointsTeam(id:number, matchs: any[]) {
    console.log(this.getPointsTeam);
    let pointsHome = 0;
    let pointsAway = 0;

    matchs.forEach((mat) => {
      if (mat.awayTeam === id) {
        if (mat.awayTeamGoals > mat.homeTeamGoals) pointsAway += 3;
        if (mat.awayTeamGoals === mat.homeTeamGoals) pointsAway += 1;
      }
      if (mat.homeTeam === id) {
        if (mat.awayTeamGoals < mat.homeTeamGoals) pointsHome += 3;
        if (mat.awayTeamGoals === mat.homeTeamGoals) pointsHome += 1;
      }
    });
    return { pointsHome, pointsAway };
  }

  async getClassification(homeOrAway:string) : Promise<string[]> {
    const matchersFinished = await this.matchesService.getMatchersFinished();
    const arrClassification:object[] = [];
    const teams = await this.teamService.getAll();

    teams.forEach((teamElement) => {
      const team = teamElement as unknown as ITeam;
      const { pointsHome, pointsAway } = this.getPointsTeam(team.id, matchersFinished);

      arrClassification.push({
        name: team.teamName,
        totalPoints: homeOrAway === 'home' ? pointsHome : pointsAway,
      });
    });

    // console.log(matchersFinished[0]);
    // console.log(idTeamsArray);

    console.log(arrClassification);

    return ['1'];
  }

  // async getMatchersFinished() : Promise<string[]> {
  //   const teste = await this.modelMatches.findAll({where: {}});

  //   return ['1'];
  // }
}
