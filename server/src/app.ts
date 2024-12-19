import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from '@/routes';

dotenv.config();

const app = express();
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

export default app;
