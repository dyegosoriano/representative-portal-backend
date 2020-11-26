import { Column, Entity, OneToMany } from 'typeorm'

import GenericUser from './GenericUser'
import Orders from './Orders'

@Entity('users', { schema: 'public' })
export default class Users extends GenericUser {
  @Column('character varying', { name: 'name', length: 255 })
  name: string

  @OneToMany(() => Orders, orders => orders.owner)
  orders: Orders[]
}
