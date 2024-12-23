import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { IUserRepository } from './user.repository';
import { CreateUserBodyDTO } from './user.dtos';
import { DefaultUserViewModel } from './user.view-models';

import { BadRequestError } from '../errors';

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async createUser(req: Request, res: Response) {
    const { username, githubUser, email, password }: CreateUserBodyDTO =
      req.body;

    try {
      const userExists =
        (await this.userRepository.findOneByUsername(username)) ||
        (await this.userRepository.findOneByEmail(email));

      if (userExists) {
        throw new BadRequestError('User already exists');
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = await this.userRepository.create({
        username,
        githubUser,
        email,
        passwordHash,
      });

      res.json(DefaultUserViewModel.toHTTP(user));
    } catch (error) {
      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
