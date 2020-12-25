import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import Provider from './Provider'
import Generic from './Generic'

@Entity('products')
export default class Product extends Generic {
  @Column('character varying', { name: 'product', length: 255 })
  product: string

  @Column('decimal', { name: 'price' })
  price: number

  @Column('integer', { name: 'amount' })
  amount: number

  @ManyToOne(() => Provider, provider => provider.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'provider', referencedColumnName: 'id' })
  provider: Provider
}
