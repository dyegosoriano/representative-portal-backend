import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Products from './Products'
import Items from './Items'
import Files from './Files'

@Index('providers_cnpj_key', ['cnpj'], { unique: true })
@Index('providers_email_key', ['email'], { unique: true })
@Index('providers_pkey', ['id'], { unique: true })
@Entity('providers', { schema: 'public' })
export default class Providers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'name_provider', length: 255 })
  nameProvider: string

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

  @OneToMany(() => Items, items => items.provider)
  items: Items[]

  @OneToMany(() => Products, products => products.provider)
  products: Products[]

  @ManyToOne(() => Files, files => files.providers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'logo_id', referencedColumnName: 'id' }])
  logo: Files
}
