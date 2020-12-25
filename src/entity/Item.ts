import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import Generic from './Generic'
import Product from './Product'
import Order from './Order'

@Entity('items')
export default class Item extends Generic {
  @Column('integer', { name: 'amount' })
  amount: number

  @Column('decimal', { name: 'total_price' })
  totalPrice: number

  @ManyToOne(() => Product, product => product.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'product', referencedColumnName: 'id' })
  product: Product

  @ManyToOne(() => Order, order => order.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'order', referencedColumnName: 'id' })
  order: Order
}
