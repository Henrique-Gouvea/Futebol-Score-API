import User from '../database/models/users';

export default class LearderboardService {
  constructor(
    private modelUser = User,
  ) {
    this.modelUser = modelUser;
  }
}
