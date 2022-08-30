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
    let pointsAway = 0; let gamesAway = 0; let victoriesAway = 0; let drawsAway = 0;
    let lossesAway = 0; let goalsFavorAway = 0; let goalsOwnAway = 0;

    matchs.forEach((mat) => {
      if (mat.awayTeam === id) {
        if (mat.awayTeamGoals > mat.homeTeamGoals) {
          pointsAway += 3; victoriesAway += 1;
        }
        if (mat.awayTeamGoals === mat.homeTeamGoals) { pointsAway += 1; drawsAway += 1; }
        gamesAway += 1; goalsFavorAway += mat.awayTeamGoals; goalsOwnAway += mat.homeTeamGoals;
        if (mat.awayTeamGoals < mat.homeTeamGoals) lossesAway += 1;
      }
    });
    return {
      pointsAway, victoriesAway, lossesAway, gamesAway, goalsFavorAway, goalsOwnAway, drawsAway,
    };
  };

  dataHomeTeam = (matchs:any[], id: number) => {
    let pointsHome = 0; let victoriesHome = 0; let lossesHome = 0; let gamesHome = 0;
    let goalsOwnHome = 0; let goalsFavorHome = 0; let drawsHome = 0;

    matchs.forEach((mat) => {
      if (mat.homeTeam === id) {
        if (mat.awayTeamGoals < mat.homeTeamGoals) {
          pointsHome += 3; victoriesHome += 1;
        }
        if (mat.awayTeamGoals === mat.homeTeamGoals) { pointsHome += 1; drawsHome += 1; }
        gamesHome += 1; goalsOwnHome += mat.awayTeamGoals; goalsFavorHome += mat.homeTeamGoals;
        if (mat.awayTeamGoals > mat.homeTeamGoals) lossesHome += 1;
      }
    });
    return {
      pointsHome, victoriesHome, lossesHome, gamesHome, goalsOwnHome, goalsFavorHome, drawsHome,
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

  createObjClassification(team:ITeam, matchersFinished: any[], homeOrAway:string): ILearderboard {
    const { pointsHome, victoriesHome, lossesHome, gamesHome, goalsOwnHome, goalsFavorHome,
      drawsHome } = this.dataHomeTeam(matchersFinished, team.id);
    const { pointsAway, victoriesAway, lossesAway, gamesAway, goalsFavorAway, goalsOwnAway,
      drawsAway } = this.dataAwayTeam(matchersFinished, team.id);
    const classification = { name: team.teamName,
      totalPoints: homeOrAway === 'home' ? pointsHome : pointsAway,
      totalGames: homeOrAway === 'home' ? gamesHome : gamesAway,
      totalVictories: homeOrAway === 'home' ? victoriesHome : victoriesAway,
      totalDraws: homeOrAway === 'home' ? drawsHome : drawsAway,
      totalLosses: homeOrAway === 'home' ? lossesHome : lossesAway,
      goalsFavor: homeOrAway === 'home' ? goalsFavorHome : goalsFavorAway,
      goalsOwn: homeOrAway === 'home' ? goalsOwnHome : goalsOwnAway,
      goalsBalance: homeOrAway === 'home'
        ? goalsFavorHome - goalsOwnHome : goalsFavorAway - goalsOwnAway,
      efficiency: homeOrAway === 'home'
        ? this.calcEfficiency(pointsHome, gamesHome) : this.calcEfficiency(pointsAway, gamesAway),
    };
    return classification;
  }

  async getClassification(homeOrAway:string) : Promise<ILearderboard[]> {
    const matchersFinished = await this.matchesService.getMatchersFinished();
    const arrClassification:ILearderboard[] = [];
    const teams = await this.teamService.getAll();
    teams.forEach((teamElement) => {
      const team = teamElement as unknown as ITeam;
      const objClassification: ILearderboard = this
        .createObjClassification(team, matchersFinished, homeOrAway);
      arrClassification.push(objClassification);
    });
    const classificationOrder: ILearderboard[] = arrClassification.sort(this.tiebreaker);
    return classificationOrder;
  }
}