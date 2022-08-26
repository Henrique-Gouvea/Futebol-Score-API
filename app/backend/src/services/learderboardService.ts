import { ILearderboardService } from '../interfaces/Learderboard/ILearderboardService';
import Matches from '../database/models/matches';
import { IMatcheservice } from '../interfaces/Matches/MatchesService';
import MatchesService from './matchesService';

export default class LearderboardService implements ILearderboardService<string> {
  private matchesService: IMatcheservice<Matches>;
  constructor(
    private modelMatches = Matches,
  ) {
    this.modelMatches = modelMatches;
    this.matchesService = new MatchesService();
  }

  async getClassification(homeOrAway:string) : Promise<string[]> {
    const matchersFinished = await this.matchesService.getMatchersFinished();
    console.log(matchersFinished[0]);
    console.log(matchersFinished[1]);
    console.log(matchersFinished[2]);
    console.log(matchersFinished[3]);

    console.log(homeOrAway);

    return ['1'];
  }

  // async getMatchersFinished() : Promise<string[]> {
  //   const teste = await this.modelMatches.findAll({where: {}});

  //   return ['1'];
  // }
}
