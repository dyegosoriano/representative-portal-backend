import User from '@entity/User'

interface Render {
  id: string
  name: string
  email: string
  cnpj: string
}

export default {
  render(user: User): Render {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cnpj: user.cnpj,
    }
  },
}
