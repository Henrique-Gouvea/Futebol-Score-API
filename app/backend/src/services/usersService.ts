import { IloginUser } from '../interfaces/User/User';
import User from '../database/models/users';
import { IUserService } from '../interfaces/User/UserService';

export default class UserService implements IUserService {
  constructor(private modelUser = User) {
    this.modelUser = modelUser;
  }

  async login({ email, password }: IloginUser): Promise<IloginUser> {
    const user: User = await this.modelUser.findOne({ where: { email, password } });

    return {
      email,
      password,
      token,
    };
  }
}
