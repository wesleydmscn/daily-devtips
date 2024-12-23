import 'reflect-metadata';

import express from 'express';
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

export default app;
