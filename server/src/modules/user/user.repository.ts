import { Repository } from 'typeorm/browser';

import { dataSource } from '@/config/typeorm.config';
import { User } from '@/entities/user.entity';
import { BadRequestError } from '../errors';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
}

export class UserRepository implements UserRepository {
  private readonly database: Repository<User>;

  constructor() {
    this.database = dataSource.getRepository(User);
  }

  async createUser(user: User): Promise<User> {
    const userExists =
      (await this.getUserByUsername(user.username)) ||
      (await this.getUserByEmail(user.email));

    if (userExists) {
      throw new BadRequestError('User already exists');
    }

    const createdUser = this.database.create(user);
    return await this.database.save(createdUser);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return await this.getUserByField('username', username);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.getUserByField('email', email);
  }

  private async getUserByField(
    field: keyof User,
    value: string,
  ): Promise<User | null> {
    return await this.database.findOne({ where: { [field]: value } });
  }
}
