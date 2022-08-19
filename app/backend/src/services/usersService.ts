import { IloginUser } from '../interfaces/User/User';
import User from '../database/models/users';
import { IUserService } from '../interfaces/User/UserService';
import loginValidate from '../validation/schemas/loginSchema';

export default class UserService implements IUserService {
  constructor(private modelUser = User) {
    this.modelUser = modelUser;
  }

  async login({ email, password }: IloginUser): Promise<IloginUser> {
    loginValidate({ email, password });
    // if (!email) throw new HandleError('ValidationError', 'All fields must be filled');

    const user: User | null = await this.modelUser.findOne({ where: { email } });
    if (user) { console.log(`encontrou usuario DB ${user}`); }

    const token = '123456';
    return {
      email,
      password,
      token,
    };
  }
}
