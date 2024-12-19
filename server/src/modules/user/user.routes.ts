import { Router } from 'express';

import { validateDto } from '@/middlewares/validate';

import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { CreateUserBodyDTO } from './user.dtos';

const router = Router();

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

router.post('/user', validateDto(CreateUserBodyDTO), (req, res) =>
  userController.createUser(req, res),
);

export { router as userRoutes };
