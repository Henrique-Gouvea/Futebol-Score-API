import { IloginUser } from '../interfaces/User/User';
import User from '../database/models/users';
import { IUserService } from '../interfaces/User/UserService';
// import { IUserValidation } from '../interfaces/User/UserValidation';
import loginValidate from '../validation/schemas/loginSchema';
import { IToken } from '../interfaces/Providers/IToken';
import { ICrypto } from '../interfaces/Providers/ICrypto';
import HandleError from '../interfaces/Error/handleError';

export default class UserService implements IUserService {
  constructor(
    private token: IToken,
    private crypto: ICrypto,
    private modelUser = User,
  ) {
    this.modelUser = modelUser;
  }

  async login({ email, password }: IloginUser): Promise<IloginUser> {
    loginValidate({ email, password });
    // if (!email) throw new HandleError('ValidationError', 'All fields must be filled');
    console.log(password);
    console.log('teste');
    console.log(this.token);

    const user: User | null = await User.findOne({ where: { email } });
    if (!user) {
      throw new HandleError('Unauthorized', 'Incorrect email or password');
    }
    console.log(password);

    const token = await this.token.generateToken(email);

    return {
      email,
      password,
      token,
    };
  }
}
