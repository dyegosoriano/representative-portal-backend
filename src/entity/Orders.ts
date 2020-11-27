import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Items from './Items'
import Users from './Users'

@Index('orders_pkey', ['id'], { unique: true })
@Entity('orders', { schema: 'public' })
export default class Orders {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('timestamp with time zone', { name: 'confirmed', nullable: true })
  confirmed: Date | null

  @Column('timestamp with time zone', { name: 'closed', nullable: true })
  closed: Date | null

  @Column('timestamp with time zone', { name: 'delivered', nullable: true })
  delivered: Date | null

  @Column('timestamp with time zone', { name: 'on_my_way', nullable: true })
  onMyWay: Date | null

  @Column('timestamp with time zone', { name: 'canceled', nullable: true })
  canceled: Date | null

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Items, items => items.order)
  items: Items[]

  @ManyToOne(() => Users, users => users.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'owner_id', referencedColumnName: 'id' }])
  owner: Users
}
