import User from '../database/models/users';

export default class LearderboardService {
  constructor(
    private modelUser = User,
  ) {
    this.modelUser = modelUser;
  }

  async getMatchersFinished() : Promise<Matches[]> {
    const matches: Matches[] = await this.modelMatches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}
