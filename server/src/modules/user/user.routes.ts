import { Router } from 'express';

import { validateDto } from '@/middlewares/validate';

import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { CreateUserBodyDTO, LoginUserBodyDTO } from './user.dtos';

const router = Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

router.post('/login', validateDto(LoginUserBodyDTO), (req, res, next) =>
  userController.login(req, res, next),
);

router.post('/register', validateDto(CreateUserBodyDTO), (req, res, next) =>
  userController.create(req, res, next),
);

export { router as userRoutes };
