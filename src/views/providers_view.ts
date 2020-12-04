import Provider from '@entity/Provider'

export interface ProviderRender {
  id: string
  name: string
  email: string
  cnpj: number
}

export default {
  render(provider: Provider): ProviderRender {
    return {
      id: provider.id,
      name: provider.name,
      email: provider.email,
      cnpj: provider.cnpj,
    }
  },

  renderAll(providers: Provider[]): ProviderRender[] {
    return providers.map(provider => this.render(provider))
  },
}
