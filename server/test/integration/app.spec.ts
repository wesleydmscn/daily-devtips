import { Server } from 'http';
import supertest from 'supertest';

import app from '@/app';

describe('GET /', () => {
  let server: Server;

  beforeAll(async () => {
    server = app.listen();
  });

  it('should return message: "Hello World"', async () => {
    const res = await supertest(app).get('/api/');

    expect(res.statusCode).toBe(200);
    expect(res.text).toStrictEqual('Hello World!');
  });

  afterAll(async () => {
    server.close();
  });
});
