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
    let lossesHome = 0; let goalsFavorAway = 0; let goalsOwnAway = 0;

    matchs.forEach((mat) => {
      if (mat.awayTeam === id) {
        if (mat.awayTeamGoals > mat.homeTeamGoals) {
          pointsAway += 3; victoriesAway += 1; lossesHome += 1;
        }
        if (mat.awayTeamGoals === mat.homeTeamGoals) { pointsAway += 1; drawsAway += 1; }
        gamesAway += 1; goalsFavorAway += mat.awayTeamGoals; goalsOwnAway += mat.homeTeamGoals;
      }
    });
    return {
      pointsAway, victoriesAway, lossesHome, gamesAway, goalsFavorAway, goalsOwnAway, drawsAway,
    };
  };

  dataHomeTeam = (matchs:any[], id: number) => {
    let pointsHome = 0; let victoriesHome = 0; let lossesAway = 0; let gamesHome = 0;
    let goalsOwnHome = 0; let goalsFavorHome = 0; let drawsHome = 0;

    matchs.forEach((mat) => {
      if (mat.homeTeam === id) {
        if (mat.awayTeamGoals < mat.homeTeamGoals) {
          pointsHome += 3; victoriesHome += 1; lossesAway += 1;
        }
        if (mat.awayTeamGoals === mat.homeTeamGoals) { pointsHome += 1; drawsHome += 1; }
        gamesHome += 1; goalsOwnHome += mat.homeTeamGoals; goalsFavorHome += mat.awayTeamGoals;
      }
    });
    return {
      pointsHome, victoriesHome, lossesAway, gamesHome, goalsOwnHome, goalsFavorHome, drawsHome,
    };
  };

  // dataBalanceAndEfficience = (
  //   goalsFavorHome: number,
  //   goalsOwnHome: number,
  //   goalsFavorAway: number,
  //   goalsOwnAway: number,
  //   pointsHome: number,
  //   gamesHome: number,
  //   pointsAway: number,
  //   gamesAway: number,
  // ) => {
  //   const balanceHome = (goalsFavorHome - goalsOwnHome) * (-1);
  //   const balanceAway = (goalsFavorAway - goalsOwnAway) * (-1);
  //   const efficiencyHome = Number((pointsHome / (gamesHome * 3) * 100).toFixed(2));
  //   const efficiencyAway = Number((pointsAway / (gamesAway * 3) * 100).toFixed(2));
  //   return { balanceHome, balanceAway, efficiencyHome, efficiencyAway };
  // };

  // getPointsTeam(id:number, matchs: any[]) {
  //   console.log(this.getPointsTeam);
  //   let pointsHome = 0; let pointsAway = 0; let gamesHome = 0; let gamesAway = 0;
  //   let victoriesHome = 0; let victoriesAway = 0; let drawsAway = 0; let drawsHome = 0;
  //   let lossesHome = 0; let lossesAway = 0; let goalsFavorHome = 0; let goalsFavorAway = 0;
  //   let goalsOwnHome = 0; let goalsOwnAway = 0; let balanceAway = 0; let balanceHome = 0;
  //   let efficiencyAway = 0; let efficiencyHome = 0;

  //   matchs.forEach((mat) => {
  //     if (mat.awayTeam === id) {
  //       if (mat.awayTeamGoals > mat.homeTeamGoals) {
  //         pointsAway += 3; victoriesAway += 1; lossesHome += 1;
  //       }
  //       if (mat.awayTeamGoals === mat.homeTeamGoals) { pointsAway += 1; drawsAway += 1; }
  //       gamesAway += 1; goalsFavorAway += mat.awayTeamGoals; goalsOwnAway += mat.homeTeamGoals;
  //     }
  //     if (mat.homeTeam === id) {
  //       if (mat.awayTeamGoals < mat.homeTeamGoals) {
  //         pointsHome += 3; victoriesHome += 1; lossesAway += 1;
  //       }
  //       if (mat.awayTeamGoals === mat.homeTeamGoals) { pointsHome += 1; drawsHome += 1; }
  //       gamesHome += 1; goalsOwnHome += mat.homeTeamGoals; goalsFavorHome += mat.awayTeamGoals;
  //     }
  //     balanceHome = (goalsFavorHome - goalsOwnHome) * (-1);
  //     balanceAway = (goalsFavorAway - goalsOwnAway) * (-1);
  //     efficiencyHome = Number((pointsHome / (gamesHome * 3) * 100).toFixed(2));
  //     efficiencyAway = Number((pointsAway / (gamesAway * 3) * 100).toFixed(2));
  //   });
  //   return {
  //     pointsHome,
  //     pointsAway,
  //     gamesHome,
  //     gamesAway,
  //     victoriesHome,
  //     victoriesAway,
  //     drawsAway,
  //     drawsHome,
  //     lossesHome,
  //     lossesAway,
  //     goalsFavorHome,
  //     goalsFavorAway,
  //     goalsOwnHome,
  //     goalsOwnAway,
  //     balanceHome,
  //     balanceAway,
  //     efficiencyHome,
  //     efficiencyAway,
  //   };
  // }

  tiebreakerAway = (a: ILearderboard, b:ILearderboard) => {
    let cmp = b.totalPoints - a.totalPoints;
    if (cmp === 0) {
      const cmp2 = b.totalVictories - a.totalVictories; cmp = cmp2;
      if (cmp2 === 0) {
        const cmp3 = a.goalsBalance - b.goalsBalance;
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

  tiebreakerHome = (a: ILearderboard, b:ILearderboard) => {
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
    const { pointsHome, victoriesHome, lossesAway, gamesHome, goalsOwnHome, goalsFavorHome,
      drawsHome } = this.dataHomeTeam(matchersFinished, team.id);
    const { pointsAway, victoriesAway, lossesHome, gamesAway, goalsFavorAway, goalsOwnAway,
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
        ? (goalsFavorHome - goalsOwnHome) * (-1) : (goalsFavorAway - goalsOwnAway) * (-1),
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
    const classificationOrder: ILearderboard[] = arrClassification.sort(
      homeOrAway === 'home' ? this.tiebreakerHome : this.tiebreakerAway,
    );
    return classificationOrder;
  }

  // async getClassification(homeOrAway:string) : Promise<ILearderboard[]> {
  //   const matchersFinished = await this.matchesService.getMatchersFinished();
  //   const arrClassification:ILearderboard[] = [];
  //   const teams = await this.teamService.getAll();

  //   teams.forEach((teamElement) => {
  //     const team = teamElement as unknown as ITeam;
  //     const { pointsHome, pointsAway, gamesHome, gamesAway, victoriesHome, victoriesAway,
  //       drawsAway, drawsHome, lossesHome, lossesAway, goalsFavorHome, goalsFavorAway,
  //       goalsOwnHome, goalsOwnAway, balanceHome, balanceAway, efficiencyHome, efficiencyAway,
  //     } = this.getPointsTeam(team.id, matchersFinished);

  //     arrClassification.push({
  //       name: team.teamName,
  //       totalPoints: homeOrAway === 'home' ? pointsHome : pointsAway,
  //       totalGames: homeOrAway === 'home' ? gamesHome : gamesAway,
  //       totalVictories: homeOrAway === 'home' ? victoriesHome : victoriesAway,
  //       totalDraws: homeOrAway === 'home' ? drawsHome : drawsAway,
  //       totalLosses: homeOrAway === 'home' ? lossesHome : lossesAway,
  //       goalsFavor: homeOrAway === 'home' ? goalsFavorHome : goalsFavorAway,
  //       goalsOwn: homeOrAway === 'home' ? goalsOwnHome : goalsOwnAway,
  //       goalsBalance: homeOrAway === 'home' ? balanceHome : balanceAway,
  //       efficiency: homeOrAway === 'home' ? efficiencyHome : efficiencyAway,
  //     });
  //   });
  //   const classificationOrder: ILearderboard[] = arrClassification.sort(
  //     homeOrAway === 'home' ? this.tiebreakerHome : this.tiebreakerAway,
  //   );
  //   console.log(classificationOrder);
  //   return classificationOrder;
  // }
  // async getMatchersFinished() : Promise<string[]> {
  //   const teste = await this.modelMatches.findAll({where: {}});

  //   return ['1'];
  // }
}
