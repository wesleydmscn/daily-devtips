import { Server } from 'http';
import supertest from 'supertest';

import { dataSource } from '@/config/typeorm.config';
import app from '@/app';

describe('GET /', () => {
  let server: Server;

  beforeAll(async () => {
    await dataSource.initialize();
    server = app.listen();
  });

  it('should return message: "Hello World"', async () => {
    const res = await supertest(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.text).toStrictEqual('Hello World!');
  });

  afterAll(async () => {
    await dataSource.destroy();
    server.close();
  });
});
