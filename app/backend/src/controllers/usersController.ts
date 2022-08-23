import { Request, Response, NextFunction } from 'express';
import Users from '../database/models/users';
import { IUserService } from '../interfaces/User/UserService';

export default class UserController {
  constructor(private userService: IUserService) { }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = await this.userService.login(req.body);
      res.status(201).json({ token });
    } catch (err) {
      next(err);
    }
  }

  async validate(req: Request, res: Response, _next: NextFunction): Promise<Response | void> {
    console.log(this.login);

    const { user } = req.body;
    const { role } = await Users.findOne({ where: { email: user } }) as Users;

    res.status(200).json({ role });
  }
}
