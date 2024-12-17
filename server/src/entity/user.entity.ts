import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  githubUser: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  passwordHash: string;

  @Column('date')
  updatedAt: string;

  @Column('date')
  createdAt: string;
}
