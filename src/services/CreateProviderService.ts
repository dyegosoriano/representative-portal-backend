import { getRepository } from 'typeorm'

import providers_view, { ProviderRender } from '@views/providers_view'
import { passwordEncrypt } from '@util/password'
import AppError from '@errors/AppError'

import Provider from '@entity/Provider'

interface Request {
  password: string
  email: string
  name: string
  cnpj: number
}

export default class CreateProviderService {
  async execute({ password, email, name, cnpj }: Request): Promise<ProviderRender> {
    const providerRepository = getRepository(Provider)
    const providerExist = await providerRepository.find({ where: [{ email }, { cnpj }] })

    providerExist.find(provider => {
      if (provider.email === email) throw new AppError('Este email ja foi cadastrado!', 401)
      if (+provider.cnpj === cnpj) throw new AppError('Este CNPJ ja foi cadastrado!', 401)
    })

    const provider = providerRepository.create({
      password: await passwordEncrypt(password),
      email,
      cnpj,
      name,
    })

    await providerRepository.save(provider)

    return providers_view.render(provider)
  }
}
