import dotenv from 'dotenv';
import type { JestConfigWithTsJest } from 'ts-jest';

dotenv.config();

const config: JestConfigWithTsJest = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+.ts?$': ['ts-jest', {}],
  },
};

export default config;
