import { Entity, Column, PrimaryGeneratedColumn, Unique, Index } from 'typeorm';

@Entity()
@Unique(['username', 'email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Index()
  @Column('varchar')
  username: string;

  @Column('varchar')
  githubUser: string;

  @Index()
  @Column('varchar')
  email: string;

  @Column('varchar')
  passwordHash: string;

  @Column('timestamp', { default: new Date() })
  updatedAt?: string;

  @Column('timestamp', { default: new Date() })
  createdAt?: string;
}
