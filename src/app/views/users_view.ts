import Users from '@models/Users'

interface Render {
  id: number
  name: string
  email: string
  cnpj: string
}

export default {
  render(user: Users): Render {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      cnpj: user.cnpj,
    }
  },
}
