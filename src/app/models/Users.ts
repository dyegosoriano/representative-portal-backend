import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Orders from './Orders'

@Index('users_cnpj_key', ['cnpj'], { unique: true })
@Index('users_email_key', ['email'], { unique: true })
@Index('users_pkey', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export default class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'name', length: 255 })
  name: string

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string

  @Column('character varying', { name: 'cnpj', unique: true, length: 255 })
  cnpj: string

  @Column('character varying', { name: 'password_hash', length: 255 })
  passwordHash: string

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Orders, orders => orders.owner)
  orders: Orders[]
}
