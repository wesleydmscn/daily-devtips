import { Router } from 'express';

import { userRoutes } from '@/modules/user/user.routes';

const router = Router();

router.use(userRoutes);

router.get('/', (_req, res) => {
  res.send('Hello World!');
});

export default router;
