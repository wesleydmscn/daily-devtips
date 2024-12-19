import { User } from '@/entities/user.entity';

export class DefaultUserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      githubUser: user.githubUser,
      createdAt: user.createdAt,
    };
  }
}
