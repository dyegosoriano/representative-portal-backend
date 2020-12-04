import { Entity, OneToMany } from 'typeorm'

import GenericEntity from './GenericEntity'
import User from './User'

@Entity('providers')
export default class Provider extends GenericEntity {
  @OneToMany(() => User, user => user.id)
  users: User[]
}
