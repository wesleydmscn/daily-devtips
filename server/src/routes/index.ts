import { Router } from 'express';

import { userRoutes } from '@/modules/user/user.routes';
import errorHandler from '@/middlewares/error-handler';

const router = Router();

router.use(userRoutes);

router.get('/', (_req, res) => {
  res.send('Hello World!');
});

router.use(errorHandler);

export default router;
