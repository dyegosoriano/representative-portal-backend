import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import GenericUser from './GenericUser'
import Products from './Products'
import Items from './Items'
import Files from './Files'

@Entity('providers', { schema: 'public' })
export default class Providers extends GenericUser {
  @Column('character varying', { name: 'name_provider', length: 255 })
  name_provider: string

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
