import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm'

export default abstract class GenericUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string

  @Column('character varying', { name: 'cnpj', unique: true, length: 255 })
  cnpj: string

  @Column('character varying', { name: 'password_hash', length: 255 })
  password_hash: string

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date
}
