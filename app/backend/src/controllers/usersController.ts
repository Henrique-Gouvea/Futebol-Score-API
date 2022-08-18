import { Request, Response } from 'express';
import { IUserService } from '../interfaces/User/UserService';

export default class UserController {
  constructor(private userService: IUserService) { }

  async login(req: Request, res: Response): Promise<void> {
    const { token } = await this.userService.login(req.body);

    res.status(201).json(token);
  }
}
