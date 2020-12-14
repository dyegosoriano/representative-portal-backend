import { Column } from 'typeorm'

import Generic from './Generic'

export default abstract class GenericEntity extends Generic {
  @Column('character varying', { name: 'name', nullable: false, length: 255 })
  name: string

  @Column('character varying', { name: 'password', nullable: false, length: 60 })
  password: string

  @Column('character varying', { name: 'email', nullable: false, unique: true, length: 255 })
  email: string

  @Column('bigint', { name: 'cnpj', nullable: false, unique: true })
  cnpj: number
}
