import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 平台用户
@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column()
  avatar: string;
}
