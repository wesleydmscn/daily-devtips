import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { IUserRepository } from './user.repository';
import { CreateUserBodyDTO, LoginUserBodyDTO } from './user.dtos';
import { DefaultUserViewModel } from './user.view-models';

import { BadRequestError } from '../errors';

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: LoginUserBodyDTO = req.body;

    try {
      const user = await this.userRepository.findOneByEmail(email);

      if (!user) {
        throw new BadRequestError('User not found');
      }

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatch) {
        throw new BadRequestError('Invalid email or password');
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? '');

      res.json({ accessToken: token });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  }
}
