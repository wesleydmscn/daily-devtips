import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',

  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME ?? 'dev',
  password: process.env.DATABASE_PASSWORD ?? 'dev',
  database: process.env.DATABASE_NAME ?? 'postgres',

  entities: ['src/entity/**/*.ts'],

  logging: true,
  synchronize: true,
});
