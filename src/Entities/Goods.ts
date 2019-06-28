import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '商品名称' })
  name: string;

  @Column({ comment: '商品库存（当为-1时，为无限库存）' })
  stock: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ comment: '商品描述' })
  describe: string;

  @Column({ comment: '来源（url）' })
  source: string;

  @Column({ comment: '商品图片（url）' })
  image: string;
}
