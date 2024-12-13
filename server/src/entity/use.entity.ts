import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  githubLink: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('date')
  updatedAt: string;

  @Column('date')
  createdAt: string;
}
