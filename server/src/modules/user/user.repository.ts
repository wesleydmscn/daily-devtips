import { Repository } from 'typeorm/browser';

import { dataSource } from '@/config/typeorm.config';
import { User } from '@/entities/user.entity';

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOneByUsername(username: string): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
}

export class UserRepository implements UserRepository {
  private readonly database: Repository<User>;

  constructor() {
    this.database = dataSource.getRepository(User);
  }

  async create(user: User): Promise<User> {
    const createdUser = this.database.create(user);
    return await this.database.save(createdUser);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.findOneByField('username', username);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.findOneByField('email', email);
  }

  private async findOneByField(
    field: keyof User,
    value: string,
  ): Promise<User | null> {
    return await this.database.findOne({ where: { [field]: value } });
  }
}
