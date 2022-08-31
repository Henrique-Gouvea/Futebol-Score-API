import { ITeamService } from '../interfaces/Teams/TeamsService';
import Teams from '../database/models/teams';
import { ITeam } from '../interfaces/Teams/Teams';
import { ILearderboardService } from '../interfaces/Learderboard/ILearderboardService';
import Matches from '../database/models/matches';
import { IMatcheservice } from '../interfaces/Matches/MatchesService';
import MatchesService from './matchesService';
import TeamsService from './teamsService';
import { ILearderboard } from '../interfaces/Learderboard/ILearderboard';

export default class LearderboardService implements ILearderboardService<ILearderboard> {
  private matchesService: IMatcheservice<Matches>;
  private teamService: ITeamService<Teams | ITeam>;

  constructor(
    private modelMatches = Matches,
  ) {
    this.modelMatches = modelMatches;
    this.matchesService = new MatchesService();
    this.teamService = new TeamsService();
  }

  dataAwayTeam = (matchs:any[], id: number) => {
    let points = 0; let games = 0; let victories = 0; let draws = 0;
    let losses = 0; let goalsFavor = 0; let goalsOwn = 0;

    matchs.forEach((mat) => {
      if (mat.awayTeam === id) {
        if (mat.awayTeamGoals > mat.homeTeamGoals) {
          points += 3; victories += 1;
        }
        if (mat.awayTeamGoals === mat.homeTeamGoals) { points += 1; draws += 1; }
        games += 1; goalsFavor += mat.awayTeamGoals; goalsOwn += mat.homeTeamGoals;
        if (mat.awayTeamGoals < mat.homeTeamGoals) losses += 1;
      }
    });
    return {
      points, victories, losses, games, goalsOwn, goalsFavor, draws,
    };
  };

  dataHomeTeam = (matchs:any[], id: number) => {
    let points = 0; let victories = 0; let losses = 0; let games = 0;
    let goalsOwn = 0; let goalsFavor = 0; let draws = 0;

    matchs.forEach((mat) => {
      if (mat.homeTeam === id) {
        if (mat.awayTeamGoals < mat.homeTeamGoals) {
          points += 3; victories += 1;
        }
        if (mat.awayTeamGoals === mat.homeTeamGoals) { points += 1; draws += 1; }
        games += 1; goalsOwn += mat.awayTeamGoals; goalsFavor += mat.homeTeamGoals;
        if (mat.awayTeamGoals > mat.homeTeamGoals) losses += 1;
      }
    });
    return {
      points, victories, losses, games, goalsOwn, goalsFavor, draws,
    };
  };

  tiebreaker = (a: ILearderboard, b:ILearderboard) => {
    let cmp = b.totalPoints - a.totalPoints;
    if (cmp === 0) {
      const cmp2 = b.totalVictories - a.totalVictories; cmp = cmp2;
      if (cmp2 === 0) {
        const cmp3 = b.goalsBalance - a.goalsBalance;
        cmp = cmp3;
        if (cmp3 === 0) {
          const cmp4 = b.goalsFavor - a.goalsFavor; cmp = cmp4;
          if (cmp4 === 0) {
            const cmp5 = b.goalsOwn - a.goalsOwn; cmp = cmp5;
          }
        }
      }
    }
    return cmp;
  };

  calcEfficiency = (points: number, game: number) => {
    const gameTriple = game * 3;
    return Number(((points / gameTriple) * 100).toFixed(2));
  };

  createObjClassification(home:any, away: any, team: any, all:boolean, homeOrAwayData:any): ILearderboard {
    const classification = { name: team.teamName,
      totalPoints: all? home.points + away.points : homeOrAwayData.points,
      totalGames: all? home.games + away.games : homeOrAwayData.games,
      totalVictories: all? home.victories + away.victories : homeOrAwayData.victories,
      totalDraws: all? home.draws + away.draws : homeOrAwayData.draws,
      totalLosses: all? home.losses + away.losses : homeOrAwayData.losses,
      goalsFavor: all? home.goalsFavor + away.goalsFavor : homeOrAwayData.goalsFavor,
      goalsOwn: all? home.goalsOwn + away.goalsOwn : homeOrAwayData.goalsOwn,
      goalsBalance: all
      ? ((home.goalsFavor - home.goalsOwn)+away.goalsFavor - away.goalsOwn)
      : homeOrAwayData.goalsFavor - homeOrAwayData.goalsOwn,
      efficiency: all
      ? this.calcEfficiency(home.points+away.points, home.games+away.games)
      : this.calcEfficiency(homeOrAwayData.points, homeOrAwayData.games),
    };
    return classification;
  }

  async getClassification(homeOrAway:string) : Promise<ILearderboard[]> {
    const matchersFinished = await this.matchesService.getMatchersFinished();
    const arrClassification:ILearderboard[] = [];
    let homeDataPoints = [] as any;
    let awayDataPoints = [] as any;
    let all:boolean = false;
    let homeOrAwayData = [] as any;
    const teams = await this.teamService.getAll();
    teams.forEach((teamElement) => {
      const team = teamElement as unknown as ITeam;
      homeDataPoints = this.dataHomeTeam(matchersFinished, team.id);
      awayDataPoints = this.dataAwayTeam(matchersFinished, team.id);
      if(!homeOrAway) all = true;
      if(homeOrAway ==='away') homeOrAwayData = awayDataPoints;
      if(homeOrAway === 'home') homeOrAwayData = homeDataPoints;
      const objClassification: ILearderboard = this
        .createObjClassification(homeDataPoints, awayDataPoints, team, all, homeOrAwayData);
      arrClassification.push(objClassification);
    });
    const classificationOrder: ILearderboard[] = arrClassification.sort(this.tiebreaker);
    return classificationOrder;
  }
}
