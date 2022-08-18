import { IloginUser } from './User';

export interface IUserService {
  login({ email, password }: IloginUser): Promise<IloginUser>
}
