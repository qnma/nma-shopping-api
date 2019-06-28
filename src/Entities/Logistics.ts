import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

// 物流
@Entity()
export default class Logistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column({ comment: '物流单号' })
  oddNumber: string;

  @Column({ comment: '物流公司' })
  company: string;

  @CreateDateColumn({ type: 'timestamp', comment: '物流单号录入时间' })
  createtimestame: Date;
}
