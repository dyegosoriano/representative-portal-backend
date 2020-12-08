import { Entity, OneToMany } from 'typeorm'

import GenericEntity from './GenericEntity'
import Product from './Product'
import User from './User'

@Entity('providers')
export default class Provider extends GenericEntity {
  @OneToMany(() => User, user => user.id)
  users: User[]

  @OneToMany(() => Product, product => product.id)
  products: Product[]
}
