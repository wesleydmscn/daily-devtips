import supertest from 'supertest';
import app from '@/app';

describe('GET /', () => {
  it('should return message: "Hello World"', async () => {
    const res = await supertest(app).get('/');

    expect(res.statusCode).toBe(200);
    expect(res.text).toStrictEqual('Hello World!');
  });
});
