import { Column } from 'typeorm'

import Generic from './Generic'

export default abstract class GenericEntity extends Generic {
  @Column('character varying', { name: 'name', length: 255 })
  name: string

  @Column('character varying', { name: 'password', length: 255 })
  password: string

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string

  @Column('character varying', { name: 'cnpj', unique: true, length: 255 })
  cnpj: number
}
