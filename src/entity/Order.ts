import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import Generic from './Generic'
import Item from './Item'
import User from './User'

@Entity('orders')
export default class Order extends Generic {
  @Column('timestamp with time zone', { name: 'confirmed', nullable: true })
  confirmed: Date | null

  @Column('timestamp with time zone', { name: 'delivered', nullable: true })
  delivered: Date | null

  @Column('timestamp with time zone', { name: 'on_my_way', nullable: true })
  onMyWay: Date | null

  @Column('timestamp with time zone', { name: 'closed', nullable: true })
  closed: Date | null

  @Column('timestamp with time zone', { name: 'canceled', nullable: true })
  canceled: Date | null

  @ManyToOne(() => User, user => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn([{ name: 'owner', referencedColumnName: 'id' }])
  owner: User

  @OneToMany(() => Item, item => item.order)
  items: Item[]
}
