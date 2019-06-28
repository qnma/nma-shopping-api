import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
} from 'typeorm';

// 购物订单
@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Generated('uuid')
  uuid: string;

  @Column('decimal', { comment: '订单价格￥' })
  price: number;

  @CreateDateColumn({ type: 'timestamp', comment: '订单创建时间' })
  createTimestamp: Date;

  @Column({ comment: '支付时间' })
  payTimestamp: Date;

  @Column({ comment: '是否支付', default: false })
  hasPay: boolean;

  @Column({
    comment: '订单是否有效（取消订单，订单未支付，操作非法）',
    default: true,
  })
  hasValid: boolean;

  @Column({ comment: '交易是否完成' })
  success: boolean;
}
