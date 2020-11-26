import Providers from '@models/Providers'

interface Render {
  id: number
  name: string
  email: string
  cnpj: string
}

export default {
  render(provider: Providers): Render {
    return {
      id: provider.id,
      name: provider.name_provider,
      email: provider.email,
      cnpj: provider.cnpj,
    }
  },
}
