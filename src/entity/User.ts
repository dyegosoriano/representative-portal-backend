import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import GenericEntity from './GenericEntity'
import Provider from './Provider'
import Order from './Order'

@Entity('users')
export default class User extends GenericEntity {
  @ManyToOne(() => Provider, provider => provider.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'provider', referencedColumnName: 'id' })
  provider: Provider

  @OneToMany(() => Order, order => order.id)
  orders: Order[]
}
