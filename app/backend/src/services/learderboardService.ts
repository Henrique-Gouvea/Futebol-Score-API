import { ILearderboardService } from '../interfaces/Learderboard/ILearderboardService';
import User from '../database/models/users';

export default class LearderboardService implements ILearderboardService<string> {
  constructor(
    private modelUser = User,
  ) {
    this.modelUser = modelUser;
  }

  async getMatchersFinished(homeOrAway:string) : Promise<string[]> {
    console.log(this.modelUser);
    console.log(homeOrAway);

    return ['1'];
  }
}
