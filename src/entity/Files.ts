import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import Providers from './Providers'
import Products from './Products'

@Index('files_pkey', ['id'], { unique: true })
@Index('files_path_key', ['path'], { unique: true })
@Entity('files', { schema: 'public' })
export default class Files {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'name', length: 255 })
  name: string

  @Column('character varying', { name: 'path', unique: true, length: 255 })
  path: string

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date

  @Column('timestamp with time zone', { name: 'updated_at' })
  updatedAt: Date

  @OneToMany(() => Products, products => products.productImage)
  products: Products[]

  @OneToMany(() => Providers, providers => providers.logo)
  providers: Providers[]
}
