import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/User/UserService';

export default class LearderboardController {
  constructor(private userService: IUserService) { }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token } = await this.userService.login(req.body);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}
