import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 平台用户
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  username: string;

  @Column()
  avatar: string;
}
