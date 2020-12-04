import { Entity, JoinColumn, ManyToOne } from 'typeorm'

import GenericEntity from './GenericEntity'
import Provider from './Provider'

@Entity('users')
export default class User extends GenericEntity {
  @ManyToOne(() => Provider, provider => provider.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider_id: Provider
}
