import Provider from '@entity/Provider'

interface Render {
  id: string
  name: string
  email: string
  cnpj: string
}

export default {
  render(provider: Provider): Render {
    return {
      id: provider.id,
      name: provider.name,
      email: provider.email,
      cnpj: provider.cnpj,
    }
  },

  renderAll(providers: Provider[]): Render[] {
    return providers.map(provider => this.render(provider))
  },
}
