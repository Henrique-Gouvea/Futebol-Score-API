import { Request, Response } from 'express';
import { IUserService } from '../services/usersService';

export default class UserController {
  constructor(private userService: IUserService) { }

  async create(req: Request, res: Response): Promise<void> {
    const token = await this.userService.create(req.body);

    res.status(201).json(token);
  }
}
