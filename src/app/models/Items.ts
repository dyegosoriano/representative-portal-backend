import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Providers from './Providers'
import Products from './Products'
import Orders from './Orders'

@Index('items_pkey', ['id'], { unique: true })
@Entity('items', { schema: 'public' })
export default class Items {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'product_name', length: 255 })
  productName: string

  @Column('integer', { name: 'amount' })
  amount: number

  @Column('numeric', { name: 'total_price' })
  totalPrice: string

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => Orders, orders => orders.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: Orders

  @ManyToOne(() => Products, products => products.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: Products

  @ManyToOne(() => Providers, providers => providers.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'provider_id', referencedColumnName: 'id' }])
  provider: Providers
}
