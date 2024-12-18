import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',

  host: process.env.DATABASE_HOST ?? 'localhost',
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USERNAME ?? 'dev',
  password: process.env.DATABASE_PASSWORD ?? 'dev',
  database: process.env.DATABASE_NAME ?? 'postgres',

  entities: ['src/entity/**/*.ts'],

  logging: ['development', 'production'].includes(
    process.env.ENVIRONMENT ?? '',
  ),

  synchronize: true,
});

export const initializeDatabase = async () => {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    throw new Error('Database initialization failed');
  }
};
