import { Server } from 'http';
import supertest from 'supertest';

import app from '@/app';
import { dataSource } from '@/config/typeorm.config';

describe('POST /api/user', () => {
  let server: Server;

  beforeAll(async () => {
    await dataSource.initialize();
    await dataSource.getRepository('User').clear();

    server = app.listen();
  });

  it('should return the created user when a new user is created', async () => {
    const res = await supertest(app).post('/api/register').send({
      username: 'user_test',
      githubUser: 'user_test',
      email: 'user@email.com',
      password: 'test12345',
    });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username');
    expect(res.body).toHaveProperty('githubUser');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('createdAt');
  });

  it('should return 400 when trying to create a user with an existing username', async () => {
    const res = await supertest(app).post('/api/register').send({
      username: 'user_test',
      githubUser: 'user_test',
      email: 'user@email.com',
      password: 'test12345',
    });

    expect(res.statusCode).toBe(400);

    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('User already exists');
  });

  it('should allow a created user to log in successfully', async () => {
    const res = await supertest(app).post('/api/login').send({
      email: 'user@email.com',
      password: 'test12345',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
  });

  it('should return an error when a user tries to log in with an incorrect password', async () => {
    const res = await supertest(app).post('/api/login').send({
      email: 'user@email.com',
      password: 'test123456',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid email or password');
  });

  afterAll(async () => {
    await dataSource.getRepository('User').clear();
    await dataSource.destroy();

    server.close();
  });
});
