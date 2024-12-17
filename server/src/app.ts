import 'reflect-metadata';

import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { dataSource } from '@/config/typeorm.config';
import router from '@/routes';

dotenv.config();

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app: Application = express();
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', router);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

export default app;
