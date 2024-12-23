import { NextFunction, Request, Response } from 'express';

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '@/modules/errors';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof BadRequestError) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });

    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      status: 'fail',
      message: err.message,
    });

    return;
  }

  if (err instanceof NotFoundError) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });

    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

export default errorHandler;
