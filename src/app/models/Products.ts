import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Providers from './Providers'
import Items from './Items'
import Files from './Files'

@Index('products_pkey', ['id'], { unique: true })
@Entity('products', { schema: 'public' })
export default class Products {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'product_name', length: 255 })
  productName: string

  @Column('numeric', { name: 'price' })
  price: string

  @Column('integer', { name: 'amount' })
  amount: number

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Items, items => items.product)
  items: Items[]

  @ManyToOne(() => Files, files => files.products, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'product_image', referencedColumnName: 'id' }])
  productImage: Files

  @ManyToOne(() => Providers, providers => providers.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'provider_id', referencedColumnName: 'id' }])
  provider: Providers
}
