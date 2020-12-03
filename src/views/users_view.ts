import User from '@entity/User'

export interface UserRender {
  id: string
  name: string
  email: string
  cnpj: number
}

export default {
  render(user: User): UserRender {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cnpj: user.cnpj,
    }
  },
}
